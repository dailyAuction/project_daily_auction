package com.project.dailyAuction.cache;

import com.project.dailyAuction.Search.repository.KeywordRepository;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import com.project.dailyAuction.board.service.BoardService;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.service.MemberService;
import com.project.dailyAuction.notice.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class CacheProcessor {
    private final RedisTemplate<String, String> redisTemplate;
    private final BoardRepository boardRepository;
    private final KeywordRepository keywordRepository;
    private final NoticeService noticeService;
    private final MemberService memberService;
    private final BoardService boardService;

    // 보드 상태 업데이트
    @Transactional
    public void updateBoardStatusToMySql() {
        Set<String> redisKeys = redisTemplate.keys("finishedTime*");
        Iterator<String> it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            Long boardId = Long.parseLong(data.split("::")[1]);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime finishedAt = LocalDateTime.parse(redisTemplate.opsForValue().get(data), formatter);
            Board board = boardService.find(boardId);
            Member buyer = memberService.find(board.getBidderId());
            Member seller = memberService.find(board.getSellerId());
            if ((LocalDateTime.now().isAfter(finishedAt.minusMinutes(5)) ||
                    LocalDateTime.now().isEqual(finishedAt.minusMinutes(5))) && LocalDateTime.now().isBefore(finishedAt.minusMinutes(4))) {
                log.info(boardId + "번 게시글 마감 5분 전");

                //마감 임박 알림 전송
                noticeService.send(buyer, board,5);
            }
            // 경매 종료
            else if (LocalDateTime.now().isAfter(finishedAt)) {
                boardRepository.updateStatus(boardId, checkFinishCode(boardId));
                deleteFinishedTimeInRedis(boardId);
                log.info(boardId + "번 게시글 마감");

                //구매자 경매 낙찰 알림 전송
                noticeService.send(buyer, board, 2);
                //판매자 경매 낙찰 알림 전송
                noticeService.send(seller, board, 1);
                //판매자 경매 유찰 알림 전송
                noticeService.send(seller, board, 3);
            }
        }
    }

    // 입찰자 존재 여부 체크 메서드
    @Transactional
    public long checkFinishCode(long boardId) {
        Set<String> redisKeys = redisTemplate.keys("boardLeadingBidder*");
        Iterator<String> it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            Long currentBoardId = Long.parseLong(data.split("::")[1]);
            if (currentBoardId == boardId) {
                return 2;
            }
        }
        Board board = boardRepository.findById(boardId).get();
        if (board.getBidderId() != 0) {
            return 2;
        } else {
            return 1;
        }
    }

    //mysql에 조회수를 넘겨주는 메서드
    @Transactional
    public void updateViewToMySql() {
        Set<String> redisKeys = redisTemplate.keys("boardViewCount*");
        Iterator<String> it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            Long boardId = Long.parseLong(data.split("::")[1]);
            int viewCnt = Integer.parseInt(redisTemplate.opsForValue().get(data));
            boardRepository.updateViews(boardId, viewCnt);
        }
    }
    @Transactional
    public void updateTopKeywordToMySql() {
        Set<String> redisKeys = redisTemplate.keys("SearchedCount*");
        Iterator<String> it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            String keyword = data.split("::")[1];
            int searchedCnt = Integer.parseInt(redisTemplate.opsForValue().get(data));
            keywordRepository.updateSearchedCnt(keyword, searchedCnt);
        }
    }

    //bidding 관련
    @Transactional
    public void updateBiddingToMySql() {
        Set<String> redisKeys = redisTemplate.keys("boardBidCount*");
        Iterator<String> it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            Long boardId = Long.parseLong(data.split("::")[1]);
            int bidCnt = Integer.parseInt(redisTemplate.opsForValue().get(data));
            boardRepository.updateBidCnt(boardId, bidCnt);
        }

        redisKeys = redisTemplate.keys("boardLeadingBidder*");
        it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            Long boardId = Long.parseLong(data.split("::")[1]);
            long bidderId = Long.parseLong(redisTemplate.opsForValue().get(data));
            boardRepository.updateBidCnt(boardId, bidderId);
        }

        redisKeys = redisTemplate.keys("boardHistory*");
        it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            Long boardId = Long.parseLong(data.split("::")[1]);
            String history = redisTemplate.opsForValue().get(data);
            boardRepository.updateHistory(boardId, history);
        }
    }

    //업데이트 후 레디스 전체 초기화
    public void flushRedis() {
        redisTemplate.execute(new RedisCallback<Object>() {
            @Override
            public Object doInRedis(RedisConnection connection) throws DataAccessException {
                connection.flushAll();
                return null;
            }
        });
    }

    // 한시간마다 db업데이트 후 삭제
    public void deleteRedisPerHour() {
        redisTemplate.execute(new RedisCallback<Object>() {
            @Override
            public Object doInRedis(RedisConnection connection) throws DataAccessException {
                redisTemplate.delete(Arrays.asList(
                        "boardHistory*",
                        "boardBidCount*",
                        "boardLeadingBidder*",
                        "boardViewCount*",
                        "SearchedCount*"));
                return null;
            }
        });
    }

    // redis에서 시간 지난 finishedAt 삭제
    public void deleteFinishedTimeInRedis(long boardId) {
        redisTemplate.execute(new RedisCallback<Object>() {
            @Override
            public Object doInRedis(RedisConnection connection) throws DataAccessException {
                redisTemplate.delete("finishedTime::" + boardId);
                return null;
            }
        });
    }
}

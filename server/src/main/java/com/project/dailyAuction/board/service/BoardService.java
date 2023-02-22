package com.project.dailyAuction.board.service;

import com.project.dailyAuction.board.Dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import com.project.dailyAuction.boardMember.entity.BoardMember;
import com.project.dailyAuction.boardMember.repository.BoardMemberRepository;
import com.project.dailyAuction.cache.CacheProcessor;
import com.project.dailyAuction.code.ExceptionCode;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.service.MemberService;
import com.project.dailyAuction.notice.Notice;
import com.project.dailyAuction.notice.NoticeRepository;
import com.project.dailyAuction.notice.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BoardService {
    private final BoardRepository boardRepository;
    private final NoticeService noticeService;
    private final MemberService memberService;
    private final BoardMemberRepository boardMemberRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final NoticeRepository noticeRepository;
    private final CacheProcessor cacheProcessor;

    public Board saveBoard(String token, BoardDto.Post postDto) {
        Member member = memberService.findByAccessToken(token);
        Board createdBoard = Board.builder()
                .title(postDto.getTitle())
                .description(postDto.getDescription())
                //todo: 이미지 변환 필요, 썸네일 생성 필요
                .image(postDto.getImage())
                .thumbnail("")
                .statusId(0)
                .categoryId(postDto.getCategoryId())
                .createdAt(LocalDateTime.now().plusHours(9))
                .finishedAt(LocalDateTime.now().plusHours(33))
                .sellerId(member.getMemberId())
                .startingPrice(postDto.getStartingPrice())
                .currentPrice(postDto.getStartingPrice())
                .sellerId(member.getMemberId())
                .history(String.valueOf(postDto.getStartingPrice()))
                .build();

        return boardRepository.save(createdBoard);
    }

    //    @Cacheable(key = "#boardId", value = "findBoard")
    public BoardDto.Response getDetailPage(String token, long boardId,int currentPrice, int viewCount, int bidCount, long bidderId, String history) {
        Board target = find(boardId);

        Integer[] histories = Arrays.stream(history.split(","))
                .mapToInt(Integer::parseInt).boxed().toArray(Integer[]::new);


        BoardDto.Response response = BoardDto.Response.builder()
                .boardId(boardId)
                .title(target.getTitle())
                .description(target.getDescription())
                .categoryId(target.getCategoryId())
                .image(target.getImage())
                .thumbnail(target.getThumbnail())
                .startingPrice(target.getStartingPrice())
                .currentPrice(currentPrice)
                .createdAt(target.getCreatedAt())
                .finishedAt(target.getFinishedAt())
                .viewCount(viewCount)
                .bidCount(bidCount)
                .history(histories)
                .statusId(target.getStatusId())
                .bidderId(bidderId)
                .sellerId(target.getSellerId())
                .build();

        if (token != null) {
            Member member = memberService.findByAccessToken(token);
            //내 가격 업데이트
            response.updateMyPrice(findMyPrice(token, boardId));

            //유저가 board상세페이지에 접속하려고하면 알림의 상태를 읽음으로 바꾼다.
            List<Notice> notices = noticeRepository.findAllByReceiverAndBoard(member, target);
            if (!notices.isEmpty()) {
                notices.forEach(
                        notice -> {
                            notice.read();
                        }
                );
            }
        }
        return response;
    }

    public int getViewCount(long boardId, HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        int viewCount;
        // 조회수 로직
        Cookie oldCookie = null;
        Cookie[] cookies = httpRequest.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("postView")) {
                    oldCookie = cookie;
                }
            }
        }

        if (oldCookie != null) { // 쿠키 묶음이 있는 경우 -> 체크 후 증가
            if (!oldCookie.getValue().contains("[" + boardId + "]")) {  // 그 중에서 해당 보드 쿠키가 없는 경우
                viewCount = addViewCntToRedis(boardId);
                oldCookie.setValue(oldCookie.getValue() + "_[" + boardId + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                httpResponse.addCookie(oldCookie);
            } else {  // 해당 보드 쿠키는 있는 경우
                viewCount = getViewCntToRedis(boardId);
            }
        } else { // 쿠키 묶음이 없는 경우 -> 무조건 증가
            viewCount = addViewCntToRedis(boardId);
            Cookie newCookie = new Cookie("postView", "[" + boardId + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            httpResponse.addCookie(newCookie);
        }
        return viewCount;
    }

    public int getViewCntToRedis(long boardId) {
        String key = "boardViewCount::" + boardId;
        //캐시에 값이 없으면 레포지토리에서 조회 & 있으면 값을 증가시킨다.
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            Board board = boardRepository.findById(boardId)
                    .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                            ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                            new IllegalArgumentException()));

            valueOperations.set(
                    key,
                    String.valueOf(board.getViewCount()));
            return Integer.parseInt(valueOperations.get(key));
        } else {
            valueOperations.get(key);
            return Integer.parseInt(valueOperations.get(key));
        }
    }
    public int addViewCntToRedis(long boardId) {
        String key = "boardViewCount::" + boardId;
        //캐시에 값이 없으면 레포지토리에서 조회 & 있으면 값을 증가시킨다.
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            Board board = boardRepository.findById(boardId)
                    .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                            ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                            new IllegalArgumentException()));

            valueOperations.set(
                    key,
                    String.valueOf(board.getViewCount() + 1));
            return Integer.parseInt(valueOperations.get(key));
        } else {
            valueOperations.increment(key);
            return Integer.parseInt(valueOperations.get(key));
        }
    }

    public int addBidCountToRedis(long boardId) {
        String key = "boardBidCount::" + boardId;
        //캐시에 값이 없으면 레포지토리에서 조회 & 있으면 값을 증가시킨다.
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            Board board = boardRepository.findById(boardId)
                    .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                            ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                            new IllegalArgumentException()));

            valueOperations.set(
                    key,
                    String.valueOf(board.getBidCount() + 1));
            return Integer.parseInt(valueOperations.get(key));
        } else {
            valueOperations.increment(key);
            return Integer.parseInt(valueOperations.get(key));
        }
    }

    private void addHistoryToRedis(long boardId, int newPrice) {
        String key = "boardHistory::" + boardId;
        //캐시에 값이 없으면 레포지토리에서 조회 & 있으면 히스토리에 추가.
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            Board board = boardRepository.findById(boardId)
                    .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                            ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                            new IllegalArgumentException()));

            valueOperations.set(
                    key,
                    String.valueOf(board.getHistory()) + "," + newPrice);
        } else {
            String lastHistory = valueOperations.get(key);
            valueOperations.set(key, lastHistory + "," + newPrice);
        }
    }

    private void changeLeadingBidderToRedis(long boardId, long bidderId) {
        String key = "boardLeadingBidder::" + boardId;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, String.valueOf(bidderId));
    }

    public int getBidCountInRedis(long boardId) {
        String key = "boardBidCount::" + boardId;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            Board board = boardRepository.findById(boardId)
                    .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                            ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                            new IllegalArgumentException()));
            return board.getBidCount();
        } else {
            return Integer.parseInt(valueOperations.get(key));
        }
    }

    public long getBidderInRedis(long boardId) {
        String key = "boardLeadingBidder::" + boardId;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            Board board = boardRepository.findById(boardId)
                    .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                            ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                            new IllegalArgumentException()));
            return board.getBidderId();
        } else {
            return Long.parseLong(valueOperations.get(key));
        }
    }

    public String getHistoryInRedis(long boardId) {
        String key = "boardHistory::" + boardId;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            Board board = boardRepository.findById(boardId)
                    .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                            ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                            new IllegalArgumentException()));
            return board.getHistory();
        } else {
            return valueOperations.get(key);
        }
    }
    public int getPriceInRedis(long boardId) {
        String key = "boardPrice::" + boardId;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            Board board = boardRepository.findById(boardId)
                    .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                            ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                            new IllegalArgumentException()));
            return board.getCurrentPrice();
        } else {
            return Integer.parseInt(valueOperations.get(key));
        }
    }

    public void setFinishedTimeToRedis(long boardId, LocalDateTime finishedTime) {
        String key = "finishedTime::" + boardId;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            Board board = boardRepository.findById(boardId)
                    .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                            ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                            new IllegalArgumentException()));
            String parsedFinishedAt = board.getFinishedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            valueOperations.set(
                    key,
                    parsedFinishedAt);
        } else {
            String parsedFinishedAt = finishedTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            valueOperations.set(key, parsedFinishedAt);
        }
    }

    public void deleteBoard(String token, long boardId) {
        Board target = find(boardId);
        if (target.getSellerId() != memberService.findByAccessToken(token).getMemberId()) {
            throw new ResponseStatusException(ExceptionCode.NOT_WRITER.getCode(),
                    ExceptionCode.NOT_WRITER.getMessage(),
                    new IllegalArgumentException());
        }
        // 경매 진행 중일 때 삭제하면 환불
        if (target.getStatusId() == 1) {
            Member lastBidder = memberService.find(target.getBidderId());
            lastBidder.changeCoin(target.getCurrentPrice());
        }

        boardRepository.delete(target);
    }


    public void bidBoard(String token, long boardId, int newPrice) {
        Member member = memberService.findByAccessToken(token);
        Board board = find(boardId);

        // 자기글에 입찰 불가
        if (member.getMemberId() == board.getSellerId()) {
            throw new ResponseStatusException(ExceptionCode.CANT_BID_SELF.getCode(),
                    ExceptionCode.CANT_BID_SELF.getMessage(),
                    new IllegalArgumentException());
        }

        int currentPrice = getPriceInRedis(boardId);

        if (board.getBidderId() != 0) {
            Member lastMember = memberService.find(board.getBidderId());
            //코인 증가
            lastMember.changeCoin(currentPrice);

            //알림 발송
            noticeService.send(lastMember, board, 3, lastMember.getCoin());
        }

        //코인이 부족하면 에러
        if (member.getCoin() < newPrice) {
            throw new ResponseStatusException(ExceptionCode.NOT_ENOUGH_COIN.getCode(),
                    ExceptionCode.NOT_ENOUGH_COIN.getMessage(),
                    new IllegalArgumentException());
        }

        //입찰가보다 낮거나 같으면 에러
        if (currentPrice >= newPrice) {
            throw new ResponseStatusException(ExceptionCode.LESS_THAN_CURRENT.getCode(),
                    ExceptionCode.LESS_THAN_CURRENT.getMessage(),
                    new IllegalArgumentException());
        }
        //리딩비더 변경
        if (board.getBidderId() == 0) {
            board.changeLeadingBidder(member.getMemberId());
        } else {
            changeLeadingBidderToRedis(board.getBoardId(), member.getMemberId());
        }

        //현재입찰가 변경
        if (board.getCurrentPrice() == 0) {
            board.updatePrice(newPrice);
        } else {
            changePriceToRedis(board.getBoardId(), newPrice);
        }

        //bid count 증가
        addBidCountToRedis(board.getBoardId());
        //히스토리 추가
        addHistoryToRedis(board.getBoardId(), newPrice);

        //기록용 남기기
        Optional<BoardMember> optionalBoardMember = boardMemberRepository.findByBoardAndMember(board, member);
        if (optionalBoardMember.isEmpty()) {
            boardMemberRepository.save(BoardMember.builder()
                    .board(board)
                    .member(member)
                    .myPrice(newPrice)
                    .build());
        } else {
            optionalBoardMember.get().changeMyPrice(newPrice);
        }

        //코인 감소
        member.changeCoin(-newPrice);
    }

    private void changePriceToRedis(long boardId, int newPrice) {
        String key = "boardPrice::" + boardId;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        valueOperations.set(key, String.valueOf(newPrice));
    }

    public Board find(long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                        ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                        new IllegalArgumentException()));
    }

    public List<Board> getPopularItem(long categoryId) {
        cacheProcessor.updateViewCntToMySql();
        if (categoryId == 0) {
            return boardRepository.findTop5ByStatusIdOrderByViewCountDesc(1);
        } else {
            return boardRepository.findTop5ByCategoryIdAndStatusIdOrderByViewCountDesc(categoryId, 1);
        }
    }

    public List<Board> getImminentItem() {
        return boardRepository.findTop5ByStatusIdOrderByCreatedAtDesc(1);
    }

    public int findMyPrice(String token, long boardId) {
        Board board = find(boardId);
        Member member = memberService.findByAccessToken(token);
        Optional<BoardMember> optionalBoardMember = boardMemberRepository.findByBoardAndMember(board, member);
        if (optionalBoardMember.isEmpty()) {
            return 0;
        } else {
            return optionalBoardMember.get().getMyPrice();
        }
    }

    public Page<Board> findBoardPage(long categoryId, int page, int size, int sort) {
        Sort defaultSort = Sort.by("boardId").descending();

        if (sort == 1) {//마감임박순 정렬
            defaultSort = Sort.by("createdAt").ascending();
        } else if (sort == 2) {//입찰수 기준 정렬
            cacheProcessor.updateBiddingToMySql();
            defaultSort = Sort.by("bidCount").descending();
        } else if (sort == 3) {//조회수 기준 정렬
            cacheProcessor.updateViewCntToMySql();
            defaultSort = Sort.by("viewCount").descending();
        } else if (sort == 4) {//높은 현재가 기준 정렬
            cacheProcessor.updateBoardPriceToMySql();
            defaultSort = Sort.by("currentPrice").descending();
        } else if (sort == 5) {//낮은 현재가 기준 정렬
            cacheProcessor.updateBoardPriceToMySql();
            defaultSort = Sort.by("currentPrice").ascending();
        }
        // 전체 리스트 조회
        if (categoryId == 0) {//최근 하루의 모든 경매 조회
            return boardRepository.getBoardsByCreatedAtAfter(LocalDateTime.now().minusDays(1), PageRequest.of(page, size, defaultSort));
        } else {//카테고리면 최근 하루의 경매 조회
            return boardRepository.findBoardsByCategoryIdAndCreatedAt(categoryId,
                    LocalDateTime.now().minusDays(1), PageRequest.of(page, size, defaultSort));
        }
    }
}

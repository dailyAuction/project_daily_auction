package com.project.dailyAuction.cache;

import com.project.dailyAuction.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Iterator;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class CacheProcessor {
    private final RedisTemplate<String, String> redisTemplate;
    private final BoardRepository boardRepository;

    //mysql에 조회수를 넘겨주는 메서드
    @Transactional
    public void updateViewToMySql(){
        Set<String> redisKeys = redisTemplate.keys("boardViewCount*");
        Iterator<String> it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            Long boardId = Long.parseLong(data.split("::")[1]);
            int viewCnt = Integer.parseInt(redisTemplate.opsForValue().get(data));
            boardRepository.updateViews(boardId, viewCnt);
        }
    }
    //bidding 관련
    @Transactional
    public void updateBiddingToMySql(){
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

    //업데이트 후 레디스 초기화
    public void flushRedis() {
        redisTemplate.execute(new RedisCallback<Object>() {
            @Override
            public Object doInRedis(RedisConnection connection) throws DataAccessException {
                connection.flushAll();
                return null;
            }
        });
    }
}

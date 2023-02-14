package com.project.dailyAuction.cache;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
@Slf4j
public class CacheEvent {
    private final CacheProcessor cacheProcessor;

    // 시작 시
    @PostConstruct
    public void initCache(){
        cacheProcessor.updateViewToMySql();
        cacheProcessor.updateBiddingToMySql();
        cacheProcessor.deleteRedisPerHour();
        log.info("조회수, 입찰 관련 반영-init");
    }

    // 순서별 정리
    //1. 초(0-59)
    //2. 분(0-59)
    //3. 시간(0-23)
    //4. 일(1-31)
    //5. 월(1-12)
    //6. 요일(0-7)

    //10분마다 실행
    //    @Scheduled(cron = "*/10 * * * * ?")

    // 한시간 마다 실행
    @Scheduled(cron = "0 0 0/1 * * ?")
    public void schedulePerHourCache() {
        // +
        cacheProcessor.updateViewToMySql();
        cacheProcessor.updateBiddingToMySql();
        cacheProcessor.updateTopKeywordToMySql();
        cacheProcessor.updateBoardPriceToMySql();
        cacheProcessor.deleteRedisPerHour();
        log.info("조회수, 입찰 관련 반영-10분");
    }

    //    1분마다 실행
    @Scheduled(cron = "0 0/1 * * * ?")
    public void schedulePerMinuteCache() {
        cacheProcessor.updateBoardStatusToMySql();
        log.info("게시글 상태 체크-1분");
    }
}

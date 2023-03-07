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
        cacheProcessor.updateViewCntToMySql();
        log.info("**Log : updateViewCntToMySql");
        cacheProcessor.updateBiddingToMySql();
        log.info("**Log : updateBiddingToMySql");
        cacheProcessor.updateTopKeywordToMySql();
        log.info("**Log : updateTopKeywordToMySql");
        cacheProcessor.updateBoardPriceToMySql();
        log.info("**Log : updateBoardPriceToMySql");
        cacheProcessor.updateBoardStatusToMySql();
        log.info("**Log : updateBoardStatusToMySql");
        cacheProcessor.deleteRedisPerHour();
        log.info("**Log : Update To DB - Init");
    }

    // 한시간 마다 실행
    @Scheduled(cron = "0 0 0/1 * * ?")
    public void schedulePerHourCache() {
        // +
        cacheProcessor.updateViewCntToMySql();
        cacheProcessor.updateBiddingToMySql();
        cacheProcessor.updateTopKeywordToMySql();
        cacheProcessor.updateBoardPriceToMySql();
        cacheProcessor.deleteRedisPerHour();
        log.info("**Log : Update To DB - Per Hour");
    }

    //    1분마다 실행
    @Scheduled(cron = "0 0/1 * * * ?")
    public void schedulePerMinuteCache() {
        cacheProcessor.updateBoardStatusToMySql();
        log.info("**Log : Update To DB - Per Minute");
    }
}

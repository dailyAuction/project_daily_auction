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
        cacheProcessor.flushRedis();
    }

    // 순서별 정리
    //1. 초(0-59)
    //2. 분(0-59)
    //3. 시간(0-23)
    //4. 일(1-31)
    //5. 월(1-12)
    //6. 요일(0-7)
    //    @Scheduled(cron = "*/10 * * * * ?")
    // 한시간 마다 실행
    @Scheduled(cron = "0 0 0/1 * * ?")
    public void scheduleCache() {
        // +
        cacheProcessor.updateViewToMySql();
        cacheProcessor.flushRedis();
        log.info("플러시 레디스");
    }
}

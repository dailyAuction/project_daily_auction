package com.project.dailyAuction.notice.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface EmitterRepository {
    SseEmitter save(String emitterId, SseEmitter sseEmitter);

    void saveEventCache(String emitterId, Object event);

    Map<String, SseEmitter> findAllEmitterStartWithByMemberId(String memberId);

    void deleteById(String id);
}

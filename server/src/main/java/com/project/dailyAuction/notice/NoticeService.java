package com.project.dailyAuction.notice;

import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.code.ExceptionCode;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {
    private final MemberService memberService;
    private final EmitterRepository emitterRepository;
    private final NoticeRepository noticeRepository;

    public SseEmitter subscribe(Long memberId) {
        String emitterId = makeTimeIncludeId(memberId);
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(86400000l));//timeout:24시간
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        String eventId = makeTimeIncludeId(memberId);
        sendNotification(emitter, eventId, emitterId, "EventStream Created. [userId=" + memberId + "]");

        return emitter;
    }

    private String makeTimeIncludeId(Long memberId) {
        return memberId + "_" + System.currentTimeMillis();
    }

    private void sendNotification(SseEmitter emitter, String eventId, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteById(emitterId);
        }
    }

    public void send(Member receiver, Board board, long status) {
        Notice notice = noticeRepository.save(createNotice(receiver, board, status));

        String receiverId = String.valueOf(receiver.getMemberId());
        String eventId = receiverId + "_" + System.currentTimeMillis();
        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterStartWithByMemberId(receiverId);
        emitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, notice);
                    sendNotification(emitter, eventId, key, NoticeResponseDto.create(notice));
                }
        );
    }

    //오버로드
    public void send(Member receiver, Board board, long status, int coin) {
        Notice notice = noticeRepository.save(createNotice(receiver, board, status));

        String receiverId = String.valueOf(receiver.getMemberId());
        String eventId = receiverId + "_" + System.currentTimeMillis();
        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterStartWithByMemberId(receiverId);
        emitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, notice);
                    sendNotification(emitter, eventId, key, NoticeResponseDto.create(notice, coin));
                }
        );
    }

    private Notice createNotice(Member receiver, Board board, long status) {
        return Notice.builder()
                .receiver(receiver)
                .contact(memberService.find(board.getSellerId()).getEmail())
                .board(board)
                .status(status)
                .isRead(false)
                .build();
    }

    public void deleteNotice(String token, long noticeId) {
        Member receiver = memberService.findByAccessToken(token);
        Notice notice = find(noticeId);
        if (notice.getReceiver().getMemberId() != receiver.getMemberId()) {
            throw new ResponseStatusException(ExceptionCode.NOT_VERIFIED.getCode(), ExceptionCode.NOT_VERIFIED.getMessage(), new IllegalArgumentException());
        }
        noticeRepository.deleteById(noticeId);
    }

    public Notice find(long noticeId) {
        return noticeRepository.findById(noticeId)
                .orElseThrow(() -> new ResponseStatusException(ExceptionCode.NOTICE_NOT_FOUND.getCode(), ExceptionCode.NOTICE_NOT_FOUND.getMessage(), new IllegalArgumentException()));
    }
}

package com.project.dailyAuction.notice.service;

import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.code.ExceptionCode;
import com.project.dailyAuction.code.NoticeStatusCode;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.service.MemberService;
import com.project.dailyAuction.notice.dto.NoticeResponseDto;
import com.project.dailyAuction.notice.entity.Notice;
import com.project.dailyAuction.notice.mapper.NoticeMapper;
import com.project.dailyAuction.notice.repository.EmitterRepository;
import com.project.dailyAuction.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class NoticeService {
    private final MemberService memberService;
    private final EmitterRepository emitterRepository;
    private final NoticeRepository noticeRepository;
    private final NoticeMapper noticeMapper;
    private final RedisTemplate redisTemplate;
    public SseEmitter subscribe(Long memberId) {
        String emitterId = makeTimeIncludeId(memberId);
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(300000l));
        log.info("**Log : SSE 구독");
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        String eventId = makeTimeIncludeId(memberId);
        sendNotification(emitter, eventId, emitterId, "EventStream Created. [userId=" + memberId + "]");
        String receiverId = String.valueOf(memberId);
        //로그인시 보유한 모든 알림 수신
        List<Notice> notices = memberService.find(memberId).getNotices();
        for (Notice notice: notices) {
            sendNotSave(receiverId, notice);
        }
        log.info("알림 전체 조회@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
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

    //저장하지 않고 보유한 알림을 전송만 하는 기능
    public void sendNotSave(String receiverId, Notice notice) {
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
        Notice notice = Notice.builder()
                .receiver(receiver)
                .contact("")
                .board(board)
                .status(status)
                .isRead(false)
                .build();
        if (status == NoticeStatusCode.판매자낙찰.getCode()) {
            notice.inputContact(memberService.find(getBidderInRedis(board)).getEmail());
        } else if(status == NoticeStatusCode.구매자낙찰.getCode()) {
            notice.inputContact(memberService.find(board.getSellerId()).getEmail());
        }
        return notice;
    }

    public List<NoticeResponseDto> getNotices(String token) {
        Member member = memberService.findByAccessToken(token);
        List<Notice> notices = member.getNotices();

        return noticeMapper.noticesTonoticeDtos(notices);
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

    public long getBidderInRedis(Board board) {
        long boardId = board.getBoardId();
        String key = "boardLeadingBidder::" + boardId;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            return board.getBidderId();
        } else {
            return Long.parseLong(valueOperations.get(key));
        }
    }
}

package com.project.dailyAuction.notice.controller;

import com.project.dailyAuction.dto.MultiResponseDto;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.service.MemberService;
import com.project.dailyAuction.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;
    private final MemberService memberService;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    @ResponseStatus(HttpStatus.OK)
    public SseEmitter subscribe(@RequestHeader(name = "Authorization") String token) {
        Member member = memberService.findByAccessToken(token);
        return noticeService.subscribe(member.getMemberId());
    }

    @GetMapping("/notices")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto getNotices(@RequestHeader(name = "Authorization") String token) {

        return new MultiResponseDto(noticeService.getNotices(token));
    }

    @DeleteMapping("/notices/{notice-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNotice(@RequestHeader(name = "Authorization") String token,
                             @PathVariable("notice-id") long noticeId) {
        noticeService.deleteNotice(token, noticeId);
    }
}

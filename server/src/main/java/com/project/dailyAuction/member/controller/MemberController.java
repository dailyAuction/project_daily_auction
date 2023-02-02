package com.project.dailyAuction.member.controller;

import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.mapper.MemberMapper;
import com.project.dailyAuction.member.repository.MemberRepository;
import com.project.dailyAuction.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final MemberMapper mapper;
    // post 회원가입 (이메일, 비밀번호 필요)
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.OK)
    public void postMember(@RequestBody MemberDto.Signup dto){
        memberService.save(mapper.signupDtoToMember(dto));
    }
    // post이메일 인증 - 가입한 이메일 확인 후 없으면 이메일 전송 (이메일 필요)
    // patch 회원 탈퇴 - 회원 상태 변경 (토큰 필요)
    // patch 비밀번호 변경 - 회원 비밀번호 변경 (토큰, 기존비밀번호 필요)
    // post비밀번호 찾기 - 가입한 이메일 확인 후 있으면 이메일 전송 (이메일 필요)
    // get마이페이지(대시보드) -  이메일, 내코인 리턴 (토큰 필요)
    // 코인 충전 - 1000원단위 충전 (토큰 필요) 변경된 코인 리턴
    // 등록 경매 -
    // 참여 경매 -
}

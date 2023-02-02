package com.project.dailyAuction.member.controller;

import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.mapper.MemberMapper;
import com.project.dailyAuction.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberRepository memberRepository;
    private final MemberMapper mapper;
    // post 회원가입 (이메일, 비밀번호 필요)
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.OK)
    public void postMember(@RequestBody MemberDto.Signup dto){

}

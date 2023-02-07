package com.project.dailyAuction.member.controller;

import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.mapper.MemberMapper;
import com.project.dailyAuction.member.repository.MemberRepository;
import com.project.dailyAuction.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

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
    @ResponseStatus(HttpStatus.CREATED)
    public void postMember(@RequestBody MemberDto.Signup dto){
        memberService.save(mapper.signupDtoToMember(dto),dto.getPassword());
    }

    // post이메일 인증 - 가입한 이메일 확인 후 없으면 이메일 전송 (이메일 필요)
    @PostMapping("/check-email")
    @ResponseStatus(HttpStatus.OK)
    public MemberDto.Code checkEmail(@RequestBody MemberDto.Email dto) throws MessagingException {
        String code = memberService.checkEmail(dto);

        return MemberDto.Code.builder().verifyCode(code).build();
    }

    // patch 회원 탈퇴 - 회원 상태 변경 (토큰 필요)
    @PatchMapping("/withdrawal")
    @ResponseStatus(HttpStatus.OK)
    public void withdrawal(@RequestHeader(name = "Authorization") String token){
        memberService.delete(token);
    }

    // patch 비밀번호 변경 - 회원 비밀번호 변경 (토큰, 기존비밀번호 필요)
    @PatchMapping("/update-pw")
    @ResponseStatus(HttpStatus.OK)
    public void updatePassword(@RequestHeader(name = "Authorization") String Token,
                               @RequestBody MemberDto.Update dto){
        memberService.update(Token,dto);
    }

    // post비밀번호 찾기 - 가입한 이메일 확인 후 있으면 이메일 전송 (이메일 필요)
    @PostMapping("/find-pw")
    @ResponseStatus(HttpStatus.OK)
    public void findPassword(@RequestBody MemberDto.Email dto) throws MessagingException {
        memberService.findPassword(dto);
    }

    // get마이페이지(대시보드) -  이메일, 내코인 리턴 (토큰 필요)
    @GetMapping("/my-page")
    @ResponseStatus(HttpStatus.OK)
    public void getMyPage(@RequestHeader(name = "Authorization")String Token){
        //todo: 이메일 전송 서비스 작성
    }

    // post코인 충전 - 1000원단위 충전 (토큰, 충전량 필요) 변경된 코인 리턴
    @PostMapping("/add-coin")
    @ResponseStatus(HttpStatus.OK)
    public void addCoin(@RequestHeader(name = "Authorization")String Token,
                        @RequestBody MemberDto.Coin coin){
        //todo: 충전 서비스 작성
    }

    // 등록 경매 -
    @GetMapping("/my-auction-list")
    @ResponseStatus(HttpStatus.OK)
    public void getMyAuction(@RequestHeader(name = "Authorization")String Token){
        //todo:
    }

    // 참여 경매 -
    @GetMapping("/participation-list")
    @ResponseStatus(HttpStatus.OK)
    public void getParticipation(@RequestHeader(name = "Authorization")String Token){
        //todo:
    }
}

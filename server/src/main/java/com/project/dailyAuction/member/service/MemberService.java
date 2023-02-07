package com.project.dailyAuction.member.service;


import com.project.dailyAuction.code.ExceptionCode;
import com.project.dailyAuction.etcService.EmailService;
import com.project.dailyAuction.etcService.RandomCodeService;
import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.code.MemberStatusCode;
import com.project.dailyAuction.member.repository.MemberRepository;
import com.project.dailyAuction.security.jwt.JwtTokenizer;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;
    private final EmailService emailService;
    private final RandomCodeService randomCodeService;

    // 멤버 저장
    public Member save(Member member, String password) {
        verifyExistEmail(member.getEmail());
        member.changePassword(passwordEncoder().encode(password));
        return memberRepository.save(member);
    }

    // 정보 수정
    public Member update(String accessToken, MemberDto.Update dto){
        Member member = findByAccessToken(accessToken);
        verifyPassword(member, dto.getCurrentPassword());

        String newPassword = passwordEncoder().encode(dto.getNewPassword());
        member.changePassword(newPassword);

        return memberRepository.save(member);
    }

    // 비밀번호 체크
    public void verifyPassword(Member member, String password){
        if (!passwordEncoder().matches(password, member.getPassword())) {
            new ResponseStatusException(ExceptionCode.WRONG_PASSWORD.getCode(), ExceptionCode.WRONG_PASSWORD.getMessage(), new IllegalArgumentException());
        }
    }

    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // 존재하는 이메일 체크
    public void verifyExistEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            new ResponseStatusException(ExceptionCode.MEMBER_EXISTS.getCode(), ExceptionCode.MEMBER_EXISTS.getMessage(), new IllegalArgumentException());
        }
    }
    public Member find(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(ExceptionCode.MEMBER_NOT_FOUND.getCode(), ExceptionCode.MEMBER_NOT_FOUND.getMessage(), new IllegalArgumentException()));
    }

    // 액세스토큰으로 멤버 찾기
    public Member findByAccessToken(String accessToken){
        long memberId = jwtTokenizer.getMemberId(accessToken);
        return find(memberId);
    }

    // 이메일로 멤버 찾기
    public Member findByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (!optionalMember.isPresent()) throw new IllegalArgumentException();

        return optionalMember.get();
    }

    // 이메일로 멤버 수 체크
    public int countByEmail(String email){
        return memberRepository.countByEmail(email);
    }

    public Member saveOauthMember(String email) {
        return memberRepository.save(Member.builder()
                .email(email)
                .password(passwordEncoder().encode("epdlffldhrtusthtufqlalfqjsgh"))
                .coin(0)
                .build()
        );
    }

    public Member findByEmailForOauth(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isEmpty()){
            return null;
        }

        return optionalMember.get();
    }

    public void delete(String token) {
        Member member = findByAccessToken(token);
        member.changeStatus(MemberStatusCode.탈퇴회원);
        // todo: 회원이 작성한 모든글 삭제하는 메서드 필요
    }

    public String checkEmail(MemberDto.Email dto) throws MessagingException {
        String email = dto.getEmail();
        if (memberRepository.countByEmail(email)==1){
            new ResponseStatusException(ExceptionCode.MEMBER_EXISTS.getCode(), ExceptionCode.MEMBER_EXISTS.getMessage(), new IllegalArgumentException());
        }

        String code = randomCodeService.genCode();
        emailService.verifyEmail(email, code);
        return code;
    }
}

package com.project.dailyAuction.member.service;


import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.entity.MemberStatus;
import com.project.dailyAuction.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;

    // 멤버 저장
    public Member save(Member member){
        verifyExistEmail(member.getEmail());

        return memberRepository.save(member);
    }

    // 정보 수정
    public Member update(String accessToken, MemberDto.Update dto){
        Member member = findByAccessToken(accessToken);
        verifyPassword(member, dto.getCurrentPassword());
//        String newPassword = passwordEncoder().encode(dto.getNewPassword())
        member.changePassword(dto.getNewPassword());

        return memberRepository.save(member);
    }

    // 비밀번호 체크
    public void verifyPassword(Member member, String password){
//        if (!passwordEncoder().matches(password, member.getPassword())) {
//            throw new IllegalArgumentException();
//        }

    }

//    public PasswordEncoder passwordEncoder() {
//        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//    }

    // 존재하는 이메일 체크
    public void verifyExistEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            //todo: 에러 코드 작성 필요
            throw new IllegalArgumentException();
        }
    }

    // 액세스토큰으로 멤버 찾기
    public Member findByAccessToken(String accessToken){
        //todo:
        return null;
    }

    // 이메일로 멤버 찾기
    public Member findByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) throw new IllegalArgumentException();

        return optionalMember.get();
    }

    public void delete(String Token) {
        Member member = findByAccessToken(Token);
        member.changeStatus(MemberStatus.탈퇴외원);
    }
}

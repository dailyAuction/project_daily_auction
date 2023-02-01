package com.project.dailyAuction.member.service;


import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.entity.Member;
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

    // 멤버 저장 메서드
    public Member save(MemberDto.SignIn dto){
        verifyExistEmail(dto.getEmail());

        return memberRepository.save(Member.builder()
                .email(dto.getEmail())
                //todo: 패스워드 암호화 필요
                .password(dto.getPassword())
                .coin(0)
                .build()
        );
    }

    // 존재하는 이메일 체크 메서드
    public void verifyExistEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            //todo: 에러 코드 작성 필요
            throw new IllegalArgumentException();
        }
    }

    // 이메일로 멤버 찾기 메서드
    public Member findByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) throw new IllegalArgumentException();

        return optionalMember.get();
    }




}

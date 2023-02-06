package com.project.dailyAuction.member.mapper;

import com.project.dailyAuction.code.ExceptionCode;
import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.code.MemberStatusCode;
import org.mapstruct.Mapper;
import org.springframework.web.server.ResponseStatusException;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member signupDtoToMember(MemberDto.Signup dto){
        if (!dto.isVerified()){
            new ResponseStatusException(ExceptionCode.NOT_VERIFIED.getCode(), ExceptionCode.NOT_VERIFIED.getMessage(), new IllegalArgumentException());
        }
        return Member.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .status(MemberStatusCode.활동회원.getMessage())
                .coin(0)
                .build();
    }
}

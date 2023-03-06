package com.project.dailyAuction.member.mapper;

import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.code.MemberStatusCode;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member signupDtoToMember(MemberDto.Signup dto){
        return Member.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .statusId(MemberStatusCode.ACTIVE.getCode())
                .coin(0)
                .build();
    }
}

package com.project.dailyAuction.member.mapper;

import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.entity.MemberStatus;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member signupDtoToMember(MemberDto.Signup dto){
        return Member.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .status(MemberStatus.활동회원)
                .coin(0)
                .build();
    }
}

package com.project.dailyAuction.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberStatusCode {
    활동회원(001,"활동회원"),
    휴면회원(002,"휴면회원"),
    탈퇴회원(003,"탈퇴회원");
    private final int code;
    private final String status;

}

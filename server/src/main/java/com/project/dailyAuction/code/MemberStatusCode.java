package com.project.dailyAuction.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberStatusCode {
    활동회원(1,"활동회원"),
    휴면회원(2,"휴면회원"),
    탈퇴회원(3,"탈퇴회원");
    private final long code;
    private final String message;

}

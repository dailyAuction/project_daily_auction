package com.project.dailyAuction.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberStatusCode {
    ACTIVE(1, "활동회원"),
    DORMANT(2, "휴면회원"),
    WITHDRAWN(3, "탈퇴회원");
    private final long code;
    private final String message;

}

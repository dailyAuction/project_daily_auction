package com.project.dailyAuction.code;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    이름(400,"메세지"),
    MEMBER_EXISTS(409,"Member Exists"),
    NOT_VERIFIED(409,"Not Verified")
    ;
    private final int code;
    private final String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}

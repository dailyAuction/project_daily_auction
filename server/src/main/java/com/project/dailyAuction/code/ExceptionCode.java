package com.project.dailyAuction.code;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    EXPIRED_TOKEN(401, "Expired Token"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409,"Member Exists"),
    BOARD_NOT_FOUND(404, "Board not found"),
    WRONG_PASSWORD(401,"Wrong Password"),
    NOT_VERIFIED(409,"Not Verified");

    private final int code;
    private final String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}

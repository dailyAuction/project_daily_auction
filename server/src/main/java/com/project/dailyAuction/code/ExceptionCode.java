package com.project.dailyAuction.code;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    EXPIRED_TOKEN(401, "Expired Token"),
    MEMBER_NOT_FOUND(404, "Member not found");

    private final int status;
    private final String message;
    ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }
}
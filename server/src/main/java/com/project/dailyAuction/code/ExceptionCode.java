package com.project.dailyAuction.code;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    BOARD_NOT_FOUND(404, "Board not found");
    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }

}

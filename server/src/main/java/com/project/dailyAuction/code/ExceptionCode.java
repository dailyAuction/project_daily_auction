package com.project.dailyAuction.code;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    EXPIRED_TOKEN(401, "Expired Token"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409,"Member Exists"),
    BOARD_NOT_FOUND(404, "Board not found"),
    WRONG_PASSWORD(401,"Wrong Password"),
    NOT_ENOUGH_COIN(409,"Coin not enough"),
    LESS_THAN_CURRENT(409,"Less than current price"),
    NOT_WRITER(401,"Not writer"),
    NOT_VERIFIED(409,"Not Verified"),
    NOTICE_NOT_FOUND(404, "Notice not found");

    private final int code;
    private final String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}

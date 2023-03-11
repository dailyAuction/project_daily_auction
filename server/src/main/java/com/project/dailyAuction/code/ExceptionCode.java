package com.project.dailyAuction.code;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    EXPIRED_TOKEN(401, "Expired Token"),
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    MEMBER_EXISTS(409, "Member Exists"),
    WITHDRAWN_MEMEBER(409, "Member Withdrawn"),
    BOARD_NOT_FOUND(404, "Board Not Found"),
    WRONG_PASSWORD(401, "Wrong Password"),
    NOT_ENOUGH_COIN(409, "Coin Not Enough"),
    LESS_THAN_CURRENT(409, "Less Than Current Price"),
    NOT_WRITER(401, "Not Writer"),
    NOT_VERIFIED(409, "Not Verified"),
    CANT_BID_SELF(409, "Can't Bid Self"),
    CANT_BID_IN_A_ROW(409, "Can't Bid In A Row"),
    NOTICE_NOT_FOUND(404, "Notice Not Found"),
    CLOSED_AUCTION(409, "Can't Bid Closed Auction"),
    CANT_BLANK_SEARCH(409, "Can't Search Blank"),
    KEYWORD_NOT_FOUND(404, "Keyword Not Found");

    private final int code;
    private final String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}

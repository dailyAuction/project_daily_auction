package com.project.dailyAuction.code;

public enum BoardStatusCode {
    PROCEEDING(1, "경매중"),
    SUCCESSFUL_BID(2, "경매종료-낙찰"),
    FAILED_BID(3, "경매종료-유찰");

    BoardStatusCode(long code, String message) {
        this.code = code;
        this.message = message;
    }

    public final long code;
    public final String message;
}

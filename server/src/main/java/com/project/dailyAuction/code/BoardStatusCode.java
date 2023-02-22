package com.project.dailyAuction.code;

public enum BoardStatusCode {
    경매중(1, "경매중"),
    낙찰(2, "경매종료-낙찰"),
    유찰(3, "경매종료-유찰");
    BoardStatusCode(long code, String message) {
        this.code = code;
        this.message = message;
    }

    public final long code;
    public final String message;
}

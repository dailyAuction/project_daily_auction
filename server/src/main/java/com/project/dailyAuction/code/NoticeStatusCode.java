package com.project.dailyAuction.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NoticeStatusCode {
    판매자낙찰(1,"판매자에게 낙찰알림"),
    구매자낙찰(2,"구매자에게 낙찰알림"),
    유찰(3,"판매자에게 유찰알림"),
    상회입찰(4,"구매자에게 상회입찰알림"),
    마감임박(5,"마지막 입찰자에게 마감임박알림");
    private final long code;
    private final String message;

}
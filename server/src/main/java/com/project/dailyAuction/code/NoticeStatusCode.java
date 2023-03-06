package com.project.dailyAuction.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NoticeStatusCode {
    SUCCESS_FOR_SELLER(1, "판매자에게 낙찰알림"),
    SUCCESS_FOR_BUYER(2, "구매자에게 낙찰알림"),
    FAILED_FOR_SELLER(3, "판매자에게 유찰알림"),
    HIGHER_FOR_BUYER(4, "구매자에게 상회입찰알림"),
    IMMINENT_FOR_BIDDER(5, "마지막 입찰자에게 마감임박알림");
    private final long code;
    private final String message;

}
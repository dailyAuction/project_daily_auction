package com.project.dailyAuction.webSocket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class Message {
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Bid{
        private long boardId;
        private int price;
        private String bidderToken;
    }
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Init{
        private long boardId;
        private String bidderToken;
    }
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long boardId;
        private int price;
        private String bidderToken;
        private int bidCount;
        private String history;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class InitResponse {
        private long boardId;
        private int bidCount;
        private int currentPrice;
        private Integer[] history;
        private int myPrice;
    }
}

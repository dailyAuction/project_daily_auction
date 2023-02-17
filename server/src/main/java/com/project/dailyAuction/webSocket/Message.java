package com.project.dailyAuction.webSocket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


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
        private long authorId;
        private long bidderId;
        private String title;
        private String description;
        private String image;
        private String thumbnail;
        private long statusId;
        private long categoryId;
        private int viewCount;
        private int bidCount;
        private int startingPrice;
        private int currentPrice;
        private LocalDateTime createdAt;
        private LocalDateTime finishedAt;
        private Integer[] history;
        private int myPrice;
    }
}

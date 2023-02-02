package com.project.dailyAuction.board.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class BoardDto {
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private String title;
        private String description;
        private String image;
        private String category;
        private int starting_price;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private String title;
        private String description;
        private String image;
        private String status;
        private String category;
        private int viewCount;
        private int bidCount;
        private int startingPrice;
        private int currentPrice;
        private LocalDateTime createdAt;
        private LocalDateTime finishedAt;

    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MiniResponse {
        private String title;
        private String description;
        private String image;
        private String status;
        private int startingPrice;
        private int currentPrice;
        private LocalDateTime createdAt;
        private LocalDateTime finishedAt;

    }
}

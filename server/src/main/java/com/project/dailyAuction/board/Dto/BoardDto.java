package com.project.dailyAuction.board.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class BoardDto {
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private String title;
        private String description;
        private String image;
        private long categoryId;
        private int starting_price;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long boardId;
        private long sellerId;
        private long bidderId;
        private String title;
        private String description;
        private String image;
        private String status;
        private long categoryId;
        private int viewCount;
        private int bidCount;
        private int startingPrice;
        private int currentPrice;
        private LocalDateTime createdAt;
        private LocalDateTime finishedAt;
        private List<Long> history;
        private int myPrice;

        public void updateMyPrice(int myPrice) {
            this.myPrice = myPrice;
        }
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
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long boardId;
        private int newPrice;


    }
}

package com.project.dailyAuction.board.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class BoardDto {
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private String title;
        private String description;
        private String image;
        private String status;
        private String category;
        private int view_count;
        private int bid_count;
        private int starting_price;
    }
}

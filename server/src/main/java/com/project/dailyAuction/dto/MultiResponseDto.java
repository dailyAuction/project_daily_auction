package com.project.dailyAuction.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private final List<T> items;

    public MultiResponseDto(List<T> items) {
        this.items = items;
    }
}

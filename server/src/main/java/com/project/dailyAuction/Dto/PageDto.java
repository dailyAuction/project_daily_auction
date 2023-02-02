package com.project.dailyAuction.Dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PageDto<T> {
    private List<T> items;
    private PageInfo pageInfo;

    public PageDto(List<T> items, Page page) {
        this.items = items;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}

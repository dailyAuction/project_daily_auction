package com.project.dailyAuction.search.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long keywordId;
    @Column
    private String keyword;
    @Column
    private int searchedCnt;

    public void cntUp() {
        this.searchedCnt++;
    }
}

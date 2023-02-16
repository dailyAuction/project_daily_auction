package com.project.dailyAuction.webSocket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private long boardId;
    private int price;
    private String bidderToken;
    private int bidCount;
    private String history;
}

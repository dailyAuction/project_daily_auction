package com.project.dailyAuction.board.entity;
import com.project.dailyAuction.notice.Notice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String title;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;
    @Column
    private long sellerId;
    @Column(nullable = false)
    private String image;
    @Column
    private String thumbnail;
    @Column
    private long statusId;
    @Column
    private String category;
    @Column
    private int viewCount;
    @Column
    private int bidCount;
    @Column
    private LocalDateTime createdAt;
    @Column
    private LocalDateTime finishedAt;
    @Column
    private int startingPrice;
    @Column
    private int currentPrice;
    @Column
    private long bidderId;
    @Column
    private String history;
    @OneToMany(mappedBy = "board")
    private List<Notice> notices = new ArrayList<>();

    public void changeLeadingBidder(long memberId, int newPrice) {
        this.bidderId = memberId;
        this.currentPrice = newPrice;
    }

    public List<Long> getHistoryList(){
        String[] histories = this.history.split(",");
        return Arrays.stream(histories)
                .mapToLong(a-> Long.parseLong(a)).boxed()
                .collect(Collectors.toList());
    }

    public void updateHistory(int newPrice) {
        this.history = this.history + "," + newPrice;
    }
}

package com.project.dailyAuction.notice;

import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.support.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "id")
@Getter
public class Notice extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    @Column(nullable = false)
    private Boolean isRead;

    @Column(nullable = false)
    private long status;

    @Column
    private String contact;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Board board;

    @Builder
    public Notice(Member receiver, Board board, long status, Boolean isRead, String contact) {
        this.receiver = receiver;
        this.status = status;
        this.isRead = isRead;
        this.board = board;
        this.contact = contact;
    }
}

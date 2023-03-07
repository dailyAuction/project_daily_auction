package com.project.dailyAuction.boardMember.entity;

import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.member.entity.Member;
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
public class BoardMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardMemberId;

    @Column
    private int myPrice;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void changeMyPrice(int price) {
        this.myPrice = price;
    }
}

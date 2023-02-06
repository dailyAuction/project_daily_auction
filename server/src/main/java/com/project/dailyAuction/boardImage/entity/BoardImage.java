package com.project.dailyAuction.boardImage.entity;

import com.project.dailyAuction.board.entity.Board;
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
public class BoardImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardImageId;

    @Column
    private String originalFileName;

    @Column
    private String storedFilePath;

    @Column
    private long fileSize;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;
}

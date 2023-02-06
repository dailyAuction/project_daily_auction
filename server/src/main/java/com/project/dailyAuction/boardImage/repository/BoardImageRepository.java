package com.project.dailyAuction.boardImage.repository;

import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.boardImage.entity.BoardImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardImageRepository extends JpaRepository<BoardImage,Long> {
    BoardImage save(BoardImage boardPicture);

    List<BoardImage> findAllByBoard(Board board);
}


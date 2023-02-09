package com.project.dailyAuction.board.repository;

import com.project.dailyAuction.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    void deleteBySellerId(long sellerId);
    Page<Board> findBySellerId(long sellerId, Pageable pageable);
    Page<Board> findAllByBoardIdIn(List<Long> ids, Pageable pageable);
    @Query(value = "select view_count from Board where board_id='boardId'", nativeQuery = true)
    Integer findViewCountByBoardId(long boardId);
}

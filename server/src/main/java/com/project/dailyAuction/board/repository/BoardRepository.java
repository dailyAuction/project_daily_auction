package com.project.dailyAuction.board.repository;

import com.project.dailyAuction.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    void deleteBySellerId(long sellerId);

    Page<Board> findBySellerId(long sellerId, Pageable pageable);
    Page<Board> findAllByBoardIdIn(List<Long> ids, Pageable pageable);

    Page<Board> findByTitleContaining(String keyword, Pageable pageable);

    Page<Board> findByCategoryIdAndTitleContaining(long categoryId, String keyword, PageRequest of);
}

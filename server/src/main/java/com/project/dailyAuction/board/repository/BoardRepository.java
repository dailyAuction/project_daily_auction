package com.project.dailyAuction.board.repository;

import com.project.dailyAuction.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    void deleteBySellerId(long sellerId);

    Page<Board> findBySellerId(long sellerId, Pageable pageable);

    Page<Board> findAllByBoardIdIn(List<Long> ids, Pageable pageable);

    Page<Board> findByTitleContaining(String keyword, Pageable pageable);

    Page<Board> findByCategoryIdAndTitleContaining(long categoryId, String keyword, PageRequest of);

    List<Board> findTop5ByCategoryIdAndStatusIdOrderByViewCountDesc(long categoryId, long statusId);

    List<Board> findTop5ByStatusIdOrderByViewCountDesc(long statusId);

    Page<Board> findByStatusIdOrderByViewCountDesc(long statusId, PageRequest of);

    List<Board> findTop5ByStatusIdOrderByCreatedAtDesc(long statusId);

    @Modifying
    @Query(value = "update board set view_count =:viewCount where board_id =:boardId", nativeQuery = true)
    void updateViews(long boardId, int viewCount);

    @Modifying
    @Query(value = "update board set bid_count =:bidCnt where board_id =:boardId", nativeQuery = true)
    void updateBidCnt(Long boardId, int bidCnt);

    @Modifying
    @Query(value = "update board set bidder_id =:bidderId where board_id =:boardId", nativeQuery = true)
    void updateBidCnt(Long boardId, long bidderId);

    @Modifying
    @Query(value = "update board set history =:history where board_id =:boardId", nativeQuery = true)
    void updateHistory(Long boardId, String history);

    @Modifying
    @Query(value = "update board set status_id =:statusId where board_id =:boardId", nativeQuery = true)
    void updateStatus(Long boardId, long statusId);

    Page<Board> getBoardsByCreatedAtAfter(LocalDateTime time, Pageable pageable);

    Page<Board> findBoardsByCategoryIdAndCreatedAtAfter(long categoryId, LocalDateTime time, Pageable pageable);

    @Modifying
    @Query(value = "update board set current_price =:price where board_id =:boardId", nativeQuery = true)
    void updatePrice(Long boardId, int price);
}

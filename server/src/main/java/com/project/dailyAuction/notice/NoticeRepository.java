package com.project.dailyAuction.notice;

import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findAllByReceiverAndBoard(Member receiver, Board board);
}

package com.project.dailyAuction.boardMember.repository;

import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.boardMember.entity.BoardMember;
import com.project.dailyAuction.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardMemberRepository extends JpaRepository<BoardMember, Long> {
    BoardMember findByBoardAndMember(Board board, Member member);
}

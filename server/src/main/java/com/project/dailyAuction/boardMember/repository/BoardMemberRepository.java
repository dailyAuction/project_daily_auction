package com.project.dailyAuction.boardMember.repository;

import com.project.dailyAuction.boardMember.entity.BoardMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardMemberRepository extends JpaRepository<BoardMember, Long> {
    BoardMember findByBoardIdAndMemberId(long boardId, long memberId);
}

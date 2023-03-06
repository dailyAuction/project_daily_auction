package com.project.dailyAuction.boardMember.repository;

import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.boardMember.entity.BoardMember;
import com.project.dailyAuction.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardMemberRepository extends JpaRepository<BoardMember, Long> {
    Optional<BoardMember> findByBoardAndMember(Board board, Member member);

    List<BoardMapping> findAllByMember(Member member);
}

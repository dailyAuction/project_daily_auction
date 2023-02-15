package com.project.dailyAuction.boardMember.repository;

import com.project.dailyAuction.board.Mapper.BoardMapping;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.boardMember.entity.BoardMember;
import com.project.dailyAuction.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardMemberRepository extends JpaRepository<BoardMember, Long> {
    BoardMember findByBoardAndMember(Board board, Member member);

    List<BoardMapping> findAllByMember(Member member);
}

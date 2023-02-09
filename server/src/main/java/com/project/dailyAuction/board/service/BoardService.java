package com.project.dailyAuction.board.service;

import com.project.dailyAuction.board.Dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import com.project.dailyAuction.boardMember.entity.BoardMember;
import com.project.dailyAuction.boardMember.repository.BoardMemberRepository;
import com.project.dailyAuction.code.ExceptionCode;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberService memberService;
    private final BoardMemberRepository boardMemberRepository;

    public void saveBoard(String token, BoardDto.Post postDto) {
        Member member = memberService.findByAccessToken(token);
        Board createdBoard = Board.builder()
                .title(postDto.getTitle())
                .description(postDto.getDescription())
                //todo: 이미지 변환 필요, 썸네일 생성 필요
                .image(postDto.getImage())
                .thumbnail("")
                .statusId(0)
                .category(postDto.getCategory())
                .createdAt(LocalDateTime.now())
                .finishedAt(LocalDateTime.now().plusDays(1))
                .startingPrice(postDto.getStarting_price())
                .sellerId(member.getMemberId())
                .history(String.valueOf(postDto.getStarting_price()))
                .build();

        boardRepository.save(createdBoard);
    }

    public  BoardDto.Response getDetailPage(long memberId, long boardId) {
        Board target = find(boardId);
        String[] history = target.getHistory().split(",");
        BoardDto.Response response = BoardDto.Response.builder()
                .boardId(boardId)
                .title(target.getTitle())
                .description(target.getDescription())
                .category(target.getCategory())
                .image(target.getImage())
                .startingPrice(target.getStartingPrice())
                .currentPrice(target.getCurrentPrice())
                .createdAt(target.getCreatedAt())
                .finishedAt(target.getFinishedAt())
                .viewCount(target.getViewCount())
                .bidCount(target.getBidCount())
                .history(target.getHistoryList())
                .statusId(target.getStatusId())
                .bidderId(target.getBidderId())
                .build();

        if (token!=null){
            Member member = memberService.findByAccessToken(token);
            //내 가격 업데이트
            response.updateMyPrice(findMyPrice(member.getMemberId(), boardId));
        }
        return response;
    }

    public void deleteBoard(long memberId,long boardId) {
        //todo: token 검증 추가예정
        Board target = find(boardId);
        boardRepository.delete(target);
    }


    public void bidBoard(long memberId, BoardDto.Patch patchDto) {
        Board board = find(patchDto.getBoardId());
        board.changeLeadingBidder(memberId, patchDto.getNewPrice());
        board.updateHistory(patchDto.getNewPrice());
    }

    public Board find(long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                        ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                        new IllegalArgumentException()));
    }
}

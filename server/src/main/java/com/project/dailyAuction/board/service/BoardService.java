package com.project.dailyAuction.board.service;

import com.project.dailyAuction.board.Dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import com.project.dailyAuction.code.ExceptionCode;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.service.MemberService;
import com.project.dailyAuction.notice.NoticeService;
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
    private final NoticeService noticeService;
    private final MemberService memberService;

    public void saveBoard(long memberId, BoardDto.Post postDto) {
        Board createdBoard = Board.builder()
                .title(postDto.getTitle())
                .description(postDto.getDescription())
                .image(postDto.getImage())
                .statusId(0)
                .category(postDto.getCategory())
                .createdAt(LocalDateTime.now())
                .startingPrice(postDto.getStartingPrice())
                .sellerId(memberId)
                .history(String.valueOf(postDto.getStartingPrice()))
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

        //todo: accessToken 작업완료 후 myPrice 추가작업

        return response;
    }

    public void deleteBoard(long memberId,long boardId) {
        //todo: token 검증 추가예정
        Board target = find(boardId);
        boardRepository.delete(target);
    }


    public void bidBoard(long memberId, BoardDto.Patch patchDto) {
        Board board = find(patchDto.getBoardId());
        Member lastBidder = memberService.find(board.getBidderId());
        board.changeLeadingBidder(memberId, patchDto.getNewPrice());
        board.updateHistory(patchDto.getNewPrice());
        noticeService.send(lastBidder, board,3);
    }

    public Board find(long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new ResponseStatusException(ExceptionCode.BOARD_NOT_FOUND.getCode(),
                        ExceptionCode.BOARD_NOT_FOUND.getMessage(),
                        new IllegalArgumentException()));
    }
}

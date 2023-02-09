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

    public BoardDto.Response getDetailPage(String token, long boardId) {
        Board target = find(boardId);

        String[] history = target.getHistory().split(",");

        //조회수 증가
        //todo: redis로 처리하기
        target.upViewCount();

        BoardDto.Response response = BoardDto.Response.builder()
                .boardId(boardId)
                .title(target.getTitle())
                .description(target.getDescription())
                .category(target.getCategory())
                .image(target.getImage())
                .thumbnail(target.getThumbnail())
                .startingPrice(target.getStartingPrice())
                .currentPrice(target.getCurrentPrice())
                .createdAt(target.getCreatedAt())
                .finishedAt(target.getFinishedAt())
                .viewCount(target.getViewCount())
                .bidCount(target.getBidCount())
                .history(target.getHistoryList())
                .statusId(target.getStatusId())
                .bidderId(target.getBidderId())
                .sellerId(target.getSellerId())
                .build();

        if (token!=null){
            Member member = memberService.findByAccessToken(token);
            //내 가격 업데이트
            response.updateMyPrice(findMyPrice(member.getMemberId(), boardId));
        }
        return response;
    }

    public void deleteBoard(String token, long boardId) {
        Board target = find(boardId);
        if (target.getSellerId() != memberService.findByAccessToken(token).getMemberId()) {
            new ResponseStatusException(ExceptionCode.NOT_WRITER.getCode(),
                    ExceptionCode.NOT_WRITER.getMessage(),
                    new IllegalArgumentException());
        }
        boardRepository.delete(target);
    }


    public void bidBoard(String token, BoardDto.Patch patchDto) {
        Member member = memberService.findByAccessToken(token);
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

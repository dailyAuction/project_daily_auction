package com.project.dailyAuction.webSocket;

import com.project.dailyAuction.board.dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import com.project.dailyAuction.board.service.BoardService;
import com.project.dailyAuction.code.BoardStatusCode;
import com.project.dailyAuction.code.ExceptionCode;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@Slf4j
public class BidController {
    private final BoardRepository boardRepository;
    private final BoardService boardService;
    private final MemberService memberService;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("/bid")
    public void bidMessage(Message.Bid message) throws Exception {
        String name = message.getName();
        long boardId = message.getBoardId();
        String token = message.getBidderToken();
        int newPrice = message.getPrice();
        Member member = memberService.findByAccessToken(token);
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        // 에러 모음
        // 존재하지 않는 보드
        if (optionalBoard.isEmpty()) {
            Message.Error response = Message.Error.builder().boardId(boardId).memberId(member.getMemberId()).message("미존재_게시글").build();
            log.info("**LOG: 입찰에러-미존재게시글");
            simpMessageSendingOperations.convertAndSendToUser(name, "/sub/board-id/" + message.getBoardId(), response);
        }
        // 자기글에 입찰 불가
        else if (member.getMemberId() == optionalBoard.get().getSellerId()) {
            Message.Error response = Message.Error.builder().boardId(boardId).memberId(member.getMemberId()).message("셀프_입찰").build();
            log.info("**LOG: 입찰에러-셀프입찰");
            simpMessageSendingOperations.convertAndSendToUser(name, "/sub/board-id/" + message.getBoardId(), response);
        }
        // 마감된 글에 입찰 불가
        else if (optionalBoard.get().getStatusId() != BoardStatusCode.경매중.code) {
            Message.Error response = Message.Error.builder().boardId(boardId).memberId(member.getMemberId()).message("마감된_게시글").build();
            log.info("**LOG: 입찰에러-마감된게시글");
            simpMessageSendingOperations.convertAndSendToUser(name, "/sub/board-id/" + message.getBoardId(), response);
        }
        // 연속입찰 불가
        else if (boardService.getBidderInRedis(optionalBoard.get()) == member.getMemberId()) {
            Message.Error response = Message.Error.builder().boardId(boardId).memberId(member.getMemberId()).message("연속_입찰").build();
            log.info("**LOG: 입찰에러-연속입찰");
            simpMessageSendingOperations.convertAndSendToUser(name, "/sub/board-id/" + message.getBoardId(), response);
        }
        //코인이 부족하면 에러
        else if (member.getCoin() < newPrice) {
            Message.Error response = Message.Error.builder().boardId(boardId).memberId(member.getMemberId()).message("코인_부족").build();
            log.info("**LOG: 입찰에러-코인부족");
            simpMessageSendingOperations.convertAndSendToUser(name, "/sub/board-id/" + message.getBoardId(), response);
        }
        //입찰가보다 낮거나 같으면 에러
        else if (boardService.getPriceInRedis(optionalBoard.get()) >= newPrice) {
            Message.Error response = Message.Error.builder().boardId(boardId).memberId(member.getMemberId()).message("낮은_입찰가").build();
            log.info("**LOG: 입찰에러-낮은입찰가");
            simpMessageSendingOperations.convertAndSendToUser(name, "/sub/board-id/" + message.getBoardId(), response);
        }
        // 에러 전혀 없음
        else {
            log.info("**LOG: 정상입찰");
            Message.Response response = boardService.bidBoard(token, boardId, newPrice);
            simpMessageSendingOperations.convertAndSend("/sub/board-id/" + message.getBoardId(), response);
        }
    }

    @MessageMapping("/init")
    public void initMessage(Message.Init message) {
        long boardId = message.getBoardId();
        String token = null;
        Board board = boardService.find(boardId);
        int bidCount = boardService.getBidCountInRedis(board);
        long bidderId = boardService.getBidderInRedis(board);

        String history = boardService.getHistoryInRedis(board);
        int currentPrice = boardService.getPriceInRedis(board);
        int viewCount = boardService.getViewCntInRedis(board);

        BoardDto.Response dto = boardService.getDetailPage(token, board, currentPrice, viewCount, bidCount, bidderId, history);

        Message.Response response = Message.Response.builder()
                .boardId(boardId)
                .bidCount(bidCount)
                .currentPrice(dto.getCurrentPrice())
                .history(dto.getHistory())
                .build();

        simpMessageSendingOperations.convertAndSend("/sub/board-id/" + message.getBoardId(), response);
    }

    @MessageExceptionHandler
    public Exception handleException(Exception exception) {
        return exception;
    }
}

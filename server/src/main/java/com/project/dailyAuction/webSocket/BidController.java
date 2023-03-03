package com.project.dailyAuction.webSocket;

import com.project.dailyAuction.board.dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.Arrays;

@Controller
@RequiredArgsConstructor
@Slf4j
public class BidController {
    private final BoardService boardService;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("/bid")
    public void bidMessage(Message.Bid message) {
        long boardId = message.getBoardId();
        String token = message.getBidderToken();
        int newPrice = message.getPrice();

        Message.Response response = boardService.bidBoard(token, boardId, newPrice);

        simpMessageSendingOperations.convertAndSend("/sub/board-id/" + message.getBoardId(), response);
    }

    @MessageMapping("/init")
    public void initMessage(Message.Init message) {
        long boardId = message.getBoardId();
        Message.Response response = boardService.createInitMessageResponse(boardId);

        simpMessageSendingOperations.convertAndSend("/sub/board-id/" + boardId, response);
    }
}

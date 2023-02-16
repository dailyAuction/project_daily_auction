package com.project.dailyAuction.webSocket;

import com.project.dailyAuction.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class BidController {
    private final BoardService boardService;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("/bid")
    public void message(Message message) {
        long boardId = message.getBoardId();
        String token = message.getBidderToken();
        int newPrice = message.getPrice();

        boardService.bidBoard(token, boardId, newPrice);

        int bidCount = boardService.getBidCountInRedis(boardId);
        String history = boardService.getHistoryInRedis(boardId);

        Message response = Message.builder()
                .boardId(boardId)
                .bidCount(bidCount)
                .history(history)
                .price(message.getPrice())
                .build();
        simpMessageSendingOperations.convertAndSend("/sub/board-id/" + message.getBoardId(), response);
    }
}

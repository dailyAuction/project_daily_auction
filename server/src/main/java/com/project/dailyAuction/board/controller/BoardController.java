package com.project.dailyAuction.board.controller;

import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.mapper.BoardMapper;
import com.project.dailyAuction.board.dto.BoardDto;
import com.project.dailyAuction.board.service.BoardService;
import com.project.dailyAuction.dto.PageDto;
import com.project.dailyAuction.webSocket.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper boardMapper;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BoardDto.IdDto postBoard(@RequestHeader(name = "Authorization") String token,
                                    @RequestPart("data") BoardDto.Post postDto,
                                    @RequestPart("files") List<MultipartFile> images) throws IOException {
        Board board = boardService.saveBoard(token, postDto, images);
        boardService.setFinishedTimeToRedis(board.getBoardId(), board.getFinishedAt());

        boardService.setFinishedTimeToRedis(board.getBoardId(), board.getFinishedAt());
        BoardDto.IdDto response = BoardDto.IdDto.builder().boardId(board.getBoardId()).build();
        return response;
    }

    @GetMapping("/{board-id}")
    @ResponseStatus(HttpStatus.OK)
    public BoardDto.Response getBoard(@RequestHeader(name = "Authorization", required = false) String token,
                                      @PathVariable("board-id") long boardId,
                                      HttpServletRequest httpRequest,
                                      HttpServletResponse httpResponse) {
        int viewCount = 0;
        int bidCount = boardService.getBidCountInRedis(boardId);
        long bidderId = boardService.getBidderInRedis(boardId);
        int currentPrice = boardService.getPriceInRedis(boardId);
        String history = boardService.getHistoryInRedis(boardId);

        viewCount = boardService.getViewCount(boardId, httpRequest, httpResponse);

        BoardDto.Response response = boardService.getDetailPage(token, boardId, currentPrice, viewCount, bidCount, bidderId, history);
        return response;
    }

    @GetMapping("/{sort}/{category-id}")
    @ResponseStatus(HttpStatus.OK)
    public PageDto getBoardByCategory(@RequestHeader(name = "Authorization", required = false) String token,
                                      @PathVariable("category-id") long categoryId,
                                      @PathVariable("sort") int sort,
                                      @RequestParam int page,
                                      @RequestParam int size) {
        Page<Board> boardPage = boardService.findBoardPage(categoryId, page - 1, size, sort);
        List<Board> boards = boardPage.getContent();
        List<BoardDto.Response> responses = boardMapper.boardListToBoardDtoList(boards);

        return new PageDto(responses, boardPage);
    }

    @PatchMapping("/{board-id}/bidding")
    @ResponseStatus(HttpStatus.OK)
    private void bidBoard(@RequestHeader(name = "Authorization") String token,
                          @PathVariable("board-id") long boardId,
                          @RequestBody BoardDto.Patch patchDto) {
        boardService.bidBoard(token, boardId, patchDto.getPrice());
        int bidCount = boardService.getBidCountInRedis(boardId);
        String history = boardService.getHistoryInRedis(boardId);
        Integer[] histories = Arrays.stream(history.split(","))
                .mapToInt(Integer::parseInt).boxed().toArray(Integer[]::new);

        Message.Response response = Message.Response.builder()
                .boardId(boardId)
                .bidCount(bidCount)
                .history(histories)
                .currentPrice(patchDto.getPrice())
                .build();
        simpMessageSendingOperations.convertAndSend("/sub/board-id/" + boardId, response);
    }

    @DeleteMapping("/{board-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBoard(@RequestHeader(name = "Authorization") String token,
                            @PathVariable("board-id") long boardId) {
        boardService.deleteBoard(token, boardId);
    }

}

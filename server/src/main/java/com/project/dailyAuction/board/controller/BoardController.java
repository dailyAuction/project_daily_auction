package com.project.dailyAuction.board.controller;

import com.project.dailyAuction.board.Dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.Mapper.BoardMapper;
import com.project.dailyAuction.board.service.BoardService;
import com.project.dailyAuction.dto.PageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper boardMapper;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void postBoard(@RequestHeader(name = "Authorization") String token,
                          @RequestBody BoardDto.Post postDto) {
        Board board = boardService.saveBoard(token, postDto);
        boardService.setFinishedTimeToRedis(board.getBoardId(),board.getFinishedAt());
    }

    @GetMapping("/{board-id}")
    @ResponseStatus(HttpStatus.OK)
    public BoardDto.Response getBoard(@RequestHeader(name = "Authorization", required = false) String token,
                                      @PathVariable("board-id") long boardId) {
        int viewCount = boardService.addViewCntToRedis(boardId);
        int bidCount = boardService.getBidCountInRedis(boardId);
        long bidderId = boardService.getBidderInRedis(boardId);
        String history = boardService.getHistoryInRedis(boardId);
        BoardDto.Response response = boardService.getDetailPage(token, boardId, viewCount,bidCount,bidderId,history);
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
        boardService.bidBoard(token, boardId, patchDto);
    }

    @DeleteMapping("/{board-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBoard(@RequestHeader(name = "Authorization") String token,
                            @PathVariable("board-id") long boardId) {
        boardService.deleteBoard(token, boardId);
    }

}

package com.project.dailyAuction.board.controller;

import com.project.dailyAuction.board.dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.mapper.BoardMapper;
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

        BoardDto.IdDto response = boardService.saveBoard(token, postDto, images);

        return response;
    }

    @GetMapping("/{board-id}")
    @ResponseStatus(HttpStatus.OK)
    public BoardDto.Response getBoard(@RequestHeader(name = "Authorization", required = false) String token,
                                      @PathVariable("board-id") long boardId,
                                      HttpServletRequest httpRequest,
                                      HttpServletResponse httpResponse) {

        BoardDto.Response response = boardService.getDetailPage(token, boardId, httpRequest, httpResponse);

        return response;
    }

    @GetMapping("/{sort}/{category-id}")
    @ResponseStatus(HttpStatus.OK)
    public PageDto getBoardsByCategory(@RequestHeader(name = "Authorization", required = false) String token,
                                       @PathVariable("category-id") long categoryId,
                                       @PathVariable("sort") int sort,
                                       @RequestParam int page,
                                       @RequestParam int size) {


        PageDto pageDto = boardService.getBoards(categoryId, page, size, sort);

        return pageDto;
    }

    @PatchMapping("/{board-id}/bidding")
    @ResponseStatus(HttpStatus.OK)
    private void bidBoard(@RequestHeader(name = "Authorization") String token,
                          @PathVariable("board-id") long boardId,
                          @RequestBody BoardDto.Patch patchDto) {
        Message.Response response = boardService.bidBoard(token, boardId, patchDto.getPrice());

        simpMessageSendingOperations.convertAndSend("/sub/board-id/" + boardId, response);
    }

    @DeleteMapping("/{board-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBoard(@RequestHeader(name = "Authorization") String token,
                            @PathVariable("board-id") long boardId) {
        boardService.deleteBoard(token, boardId);
    }

}

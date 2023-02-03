package com.project.dailyAuction.board.controller;

import com.project.dailyAuction.board.Dto.BoardDto;
import com.project.dailyAuction.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void postBoard(@RequestBody BoardDto.Post postDto) {
        long memberId = 1L; //보안토큰대신 임시 적용
        boardService.saveBoard(memberId,postDto);
    }

    @GetMapping("/{board-id}")
    @ResponseStatus(HttpStatus.OK)
    public BoardDto.Response getBoard(@PathVariable("board-id") long boardId) {
        long memberId = 2L;
        BoardDto.Response response =boardService.getDetailPage(memberId,boardId);
        return response;
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    private void bidBoard(@RequestBody BoardDto.Patch patchDto) {
        long memberId = 2L;
        boardService.bidBoard(memberId,patchDto);
    }
    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBoard(@PathVariable("board-id") long boardId) {
        long memberId = 1L;
        boardService.deleteBoard(memberId, boardId);
    }

}

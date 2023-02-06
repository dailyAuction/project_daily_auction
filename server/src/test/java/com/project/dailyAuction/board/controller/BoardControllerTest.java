package com.project.dailyAuction.board.controller;

import com.project.dailyAuction.board.Mapper.BoardMapper;
import com.project.dailyAuction.board.entity.Board;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BoardController.class)
class BoardControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BoardMapper boardMapper;

    @Test
    public void Board_생성_테스트() throws Exception {
        Board board = Board.builder()
                .boardId(1L)
                .startingPrice(100)
                .title("BoardPost테스트")
                .createdAt(LocalDateTime.now())
                .category("잡화")
                .image("imageUrl")
                .description("테스트입니다.")
                .build();
        String content = String.valueOf(boardMapper.entityToPostDto(board));

        mockMvc.perform(post("/blog")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(print());
    }
}
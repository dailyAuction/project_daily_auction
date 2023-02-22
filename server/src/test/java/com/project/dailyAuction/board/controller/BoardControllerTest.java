package com.project.dailyAuction.board.controller;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@WebMvcTest(BoardController.class)
class BoardControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private BoardMapper boardMapper;
//
//    @Test
//    public void Board_생성_테스트() throws Exception {
//        Board board = Board.builder()
//                .boardId(1L)
//                .startingPrice(100)
//                .title("BoardPost테스트")
//                .createdAt(LocalDateTime.now())
//                .categoryId(1)
//                .image("imageUrl")
//                .description("테스트입니다.")
//                .build();
//        String content = String.valueOf(boardMapper.entityToPostDto(board));
//
//        mockMvc.perform(post("/blog")
//                        .content(content)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isCreated())
//                .andDo(print());
//    }
}
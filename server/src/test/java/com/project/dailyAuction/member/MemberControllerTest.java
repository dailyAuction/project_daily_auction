package com.project.dailyAuction.member;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
public class MemberControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MemberService memberService;

    @Test
    void joinMember() throws Exception {
//        MemberDto.Signup dto = new MemberDto.Signup("abc@gmail.com", true, "1234");

        // when
        // any : 어떤 타입으로 입력이 들어오든 넘어가기위해 설정
//        when(memberService.save(any())).thenReturn(1000L);
//
//        mockMvc.perform(post("/member")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(new ObjectMapper().writeValueAsString(dto)))
//                .andExpect(status().isOk())
//                .andExpect(content().string("1000"))
//                .andDo(print());
    }
}

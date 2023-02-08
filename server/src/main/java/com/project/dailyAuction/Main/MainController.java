package com.project.dailyAuction.Main;

import com.project.dailyAuction.Search.dto.KeywordDto;
import com.project.dailyAuction.Search.service.SearchService;
import com.project.dailyAuction.board.Dto.BoardDto;
import com.project.dailyAuction.board.Mapper.BoardMapper;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.dto.PageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class MainController {
    private final SearchService searchService;
    private final BoardMapper boardMapper;
    // 검색
    @GetMapping("/{category-id}/search")
    @ResponseStatus(HttpStatus.OK)
    public PageDto search(@PathVariable("category-id") long categoryId,
                       @RequestBody KeywordDto dto,
                       @RequestParam int page,
                       @RequestParam int size) {
        Page<Board> boardPages = searchService.search(categoryId,dto,page,size);
        List<Board> boards = boardPages.getContent();

        return new PageDto(boardMapper.boardListToBoardDtoList(boards), boardPages);
    }

    // 인기검색어
    @GetMapping("/top-searched-keyword")
    @ResponseStatus(HttpStatus.OK)
    public void getTopSearchedKeyword() {
        //todo: 인기검색어 10개 리턴
    }

    // 마감임박 상품
    @GetMapping("/imminent-item")
    @ResponseStatus(HttpStatus.OK)
    public void getImminentItem() {
        //todo: 마감임박 5개 리턴
    }

    // 카테고리별 인기 상품
    @GetMapping("/{category-id}/popular-item")
    @ResponseStatus(HttpStatus.OK)
    public void getPopularItem(@PathVariable("category-id") long categoryId) {
        //todo: 카테고리별 인기상품(조회수) 5개 리턴
    }

    // 전체 인기상품
    @GetMapping("/all-popular-item")
    @ResponseStatus(HttpStatus.OK)
    public void getAllPopularItem(@RequestParam int page,
                                  @RequestParam int size) {
        //todo: 전체 인기상품(조회수) 리턴
    }
}

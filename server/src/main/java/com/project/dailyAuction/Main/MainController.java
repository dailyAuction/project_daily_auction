package com.project.dailyAuction.Main;

import com.project.dailyAuction.Search.dto.TopKeywordsDto;
import com.project.dailyAuction.Search.entity.Keyword;
import com.project.dailyAuction.Search.mapper.KeywordMapper;
import com.project.dailyAuction.Search.service.SearchService;
import com.project.dailyAuction.board.Dto.BoardDto;
import com.project.dailyAuction.board.Mapper.BoardMapper;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.service.BoardService;
import com.project.dailyAuction.dto.MultiResponseDto;
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
    private final BoardService boardService;
    private final SearchService searchService;
    private final BoardMapper boardMapper;
    private final KeywordMapper keywordMapper;

    // 검색
    @GetMapping("/{category-id}/search")
    @ResponseStatus(HttpStatus.OK)
    public PageDto search(@PathVariable("category-id") long categoryId,
                          @RequestParam int page,
                          @RequestParam int size,
                          @RequestParam String keyword) {
        log.info(keyword);
        Page<Board> boardPages = searchService.search(categoryId, keyword, page, size);
        List<Board> boards = boardPages.getContent();

        return new PageDto(boardMapper.boardListToBoardDtoList(boards), boardPages);
    }

    // 인기검색어
    @GetMapping("/top-searched-keyword")
    @ResponseStatus(HttpStatus.OK)
    public TopKeywordsDto getTopSearchedKeyword() {
        List<Keyword> list = searchService.getTopKeyword();
        return keywordMapper.listToDto(list);
    }

    // 마감임박 상품
    @GetMapping("/imminent-item")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto getImminentItem() {
        List<Board> boards = boardService.getImminentItem();
        List<BoardDto.Response> boardDtos = boardMapper.boardListToBoardDtoList(boards);
        return new MultiResponseDto(boardDtos);
    }

    // 카테고리별 인기 상품
    @GetMapping("/{category-id}/popular-item")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto getPopularItem(@PathVariable("category-id") long categoryId) {
        List<Board> boards = boardService.getPopularItem(categoryId);
        List<BoardDto.Response> boardDtos = boardMapper.boardListToBoardDtoList(boards);
        return new MultiResponseDto(boardDtos);
    }

    // 전체 인기상품
    @GetMapping("/all-popular-item")
    @ResponseStatus(HttpStatus.OK)
    public PageDto getAllPopularItem(@RequestParam int page,
                                     @RequestParam int size) {
        Page<Board> boardPages = searchService.getAllPopularItem(page, size);
        List<Board> boards = boardPages.getContent();

        return new PageDto(boardMapper.boardListToBoardDtoList(boards), boardPages);
    }
}

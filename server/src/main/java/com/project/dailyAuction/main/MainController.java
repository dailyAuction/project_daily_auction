package com.project.dailyAuction.main;

import com.project.dailyAuction.search.dto.TopKeywordsDto;
import com.project.dailyAuction.search.mapper.KeywordMapper;
import com.project.dailyAuction.search.service.SearchService;
import com.project.dailyAuction.board.mapper.BoardMapper;
import com.project.dailyAuction.board.service.BoardService;
import com.project.dailyAuction.dto.MultiResponseDto;
import com.project.dailyAuction.dto.PageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
        PageDto pageDto = searchService.getSearchPage(categoryId, keyword, page, size);

        return pageDto;
    }

    // 인기검색어
    @GetMapping("/top-searched-keyword")
    @ResponseStatus(HttpStatus.OK)
    public TopKeywordsDto getTopSearchedKeyword() {
        TopKeywordsDto topKeywords = searchService.getTopKeyword();

        return topKeywords;
    }

    // 마감임박 상품
    @GetMapping("/imminent-item")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto getImminentItem() {
        List<Board> boards = boardService.getImminentItem();
        List<Integer> prices = boardService.getPricesInRedis(boards);
        List<BoardDto.Response> boardDtos = boardMapper.boardListToBoardDtoList(boards, prices);
        return new MultiResponseDto(boardDtos);
    }

    // 카테고리별 인기 상품
    @GetMapping("/{category-id}/popular-item")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto getPopularItem(@PathVariable("category-id") long categoryId) {
        MultiResponseDto popularItemDto = boardService.getPopularItemPage(categoryId);

        return popularItemDto;
    }

    // 전체 인기상품
    @GetMapping("/all-popular-item")
    @ResponseStatus(HttpStatus.OK)
    public PageDto getAllPopularItem(@RequestParam int page,
                                     @RequestParam int size) {
        PageDto getAllPopularDto = searchService.getAllPopularPage(page, size);

        return getAllPopularDto;
    }
}

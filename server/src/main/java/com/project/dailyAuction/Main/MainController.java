package com.project.dailyAuction.Main;

import com.project.dailyAuction.Dto.SearchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class MainController {
    // 검색
    @GetMapping("/{category-id}/search")
    @ResponseStatus(HttpStatus.OK)
    public void search(@PathVariable("category-id") long categoryId,
                       @RequestBody SearchDto dto,
                       @RequestParam int page,
                       @RequestParam int size) {
        //todo: 검색 서비스 작성
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

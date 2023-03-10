package com.project.dailyAuction.search.service;

import com.project.dailyAuction.board.mapper.BoardMapper;
import com.project.dailyAuction.board.service.BoardService;
import com.project.dailyAuction.dto.PageDto;
import com.project.dailyAuction.search.dto.TopKeywordsDto;
import com.project.dailyAuction.search.entity.Keyword;
import com.project.dailyAuction.search.mapper.KeywordMapper;
import com.project.dailyAuction.search.repository.KeywordRepository;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import com.project.dailyAuction.cache.CacheProcessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SearchService {
    private final KeywordRepository keywordRepository;
    private final BoardService boardService;
    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;
    private final KeywordMapper keywordMapper;
    private final RedisTemplate<String, String> redisTemplate;
    private final CacheProcessor cacheProcessor;

    public Page<Board> search(long categoryId, String keyword, int page, int size) {
        setSearchCountInRedis(keyword);

        if (categoryId == 0) {
            return boardRepository.findByTitleContaining(keyword, PageRequest.of(page - 1, size));
        } else {
            return boardRepository.findByCategoryIdAndTitleContaining(categoryId, keyword, PageRequest.of(page - 1, size));
        }
    }

    public Keyword searchedCntUp(String keyword) {
        Optional<Keyword> optionalKeyword = keywordRepository.findByKeyword(keyword);
        if (optionalKeyword.isPresent()) {
            optionalKeyword.get().cntUp();
        } else {
            Keyword newKeyword = Keyword.builder()
                    .keyword(keyword)
                    .searchedCnt(1)
                    .build();
            keywordRepository.save(newKeyword);
            return newKeyword;
        }

        return optionalKeyword.get();
    }

    public int setSearchCountInRedis(String keyword) {
        String key = "SearchedCount::" + keyword;
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        if (valueOperations.get(key) == null) {
            Keyword keywordEntity = searchedCntUp(keyword);
            valueOperations.set(
                    key,
                    String.valueOf(keywordEntity.getSearchedCnt() + 1));
        } else {
            valueOperations.increment(key);
        }
        return Integer.parseInt(valueOperations.get(key));
    }

    public TopKeywordsDto getTopKeyword() {
        cacheProcessor.updateTopKeywordToMySql();
        List<Keyword> list =  keywordRepository.findTop10ByOrderBySearchedCntDesc();
        return keywordMapper.listToDto(list);
    }

    public Page<Board> getAllPopularItem(int page, int size) {
        cacheProcessor.updateViewCntToMySql();
        return boardRepository.findByStatusIdOrderByViewCountDesc(1, PageRequest.of(page - 1, size));
    }

    public PageDto getSearchPage(long categoryId, String keyword, int page, int size) {
        Page<Board> boardPages = search(categoryId, keyword, page, size);
        List<Board> boards = boardPages.getContent();
        List<Integer> prices = boardService.getPricesInRedis(boards);

        return new PageDto(boardMapper.boardListToBoardDtoList(boards, prices), boardPages);
    }

    public PageDto getAllPopularPage(int page, int size) {
        Page<Board> boardPages = getAllPopularItem(page, size);
        List<Board> boards = boardPages.getContent();
        List<Integer> prices = boardService.getPricesInRedis(boards);

        return new PageDto(boardMapper.boardListToBoardDtoList(boards, prices), boardPages);
    }
}

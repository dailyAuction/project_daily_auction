package com.project.dailyAuction.Search.service;

import com.project.dailyAuction.Search.dto.KeywordDto;
import com.project.dailyAuction.Search.entity.Keyword;
import com.project.dailyAuction.Search.repository.KeywordRepository;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import com.project.dailyAuction.code.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SearchService {
    private final KeywordRepository keywordRepository;
    private final BoardRepository boardRepository;
    private final RedisTemplate<String, String> redisTemplate;

    public Page<Board> search(long categoryId, KeywordDto dto, int page, int size) {
        addSearchCountInRedis(dto.getKeyword());

        if (categoryId == 0) {
            return boardRepository.findByTitleContaining(dto.getKeyword(), PageRequest.of(page - 1, size));
        } else {
            return boardRepository.findByCategoryIdAndTitleContaining(categoryId, dto.getKeyword(), PageRequest.of(page - 1, size));
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

    public int addSearchCountInRedis(String keyword) {
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
        log.info("value:{}", valueOperations.get(key));
        return Integer.parseInt(valueOperations.get(key));
    }

    public List<Keyword> getTopKeyword() {
        return keywordRepository.findTop10ByOrderBySearchedCntDesc();
    }

    public Page<Board> getAllPopularItem(int page, int size) {
        return boardRepository.findByStatusIdOrderByViewCountDesc(1, PageRequest.of(page - 1, size));
    }
}

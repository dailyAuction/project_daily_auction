package com.project.dailyAuction.Search.service;

import com.project.dailyAuction.Search.dto.KeywordDto;
import com.project.dailyAuction.Search.entity.Keyword;
import com.project.dailyAuction.Search.repository.KeywordRepository;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SearchService {
    private final KeywordRepository keywordRepository;
    private final BoardRepository boardRepository;
    public Page<Board> search(long categoryId, KeywordDto dto, int page, int size) {
        searchedCntUp(dto.getKeyword());

        if (categoryId == 0) {
            return boardRepository.findByTitleContaining(dto.getKeyword(), PageRequest.of(page - 1, size));
        }else {
            return boardRepository.findByCategoryIdAndTitleContaining(categoryId, dto.getKeyword(), PageRequest.of(page - 1, size));
        }
    }
    public Keyword searchedCntUp(String keyword){
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

    public List<Keyword> getTopKeyword() {
        return keywordRepository.findTop10ByOrderBySearchedCntDesc();
    }

    public Page<Board> getAllPopularItem(int page, int size) {
        return boardRepository.findByStatusIdOrderByViewCountDesc(1,PageRequest.of(page - 1, size));
    }
}

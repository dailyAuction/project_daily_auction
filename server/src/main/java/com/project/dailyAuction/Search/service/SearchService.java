package com.project.dailyAuction.Search.service;

import com.project.dailyAuction.Search.dto.KeywordDto;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SearchService {
    private final BoardRepository boardRepository;
    public Page<Board> search(long categoryId, KeywordDto dto, int page, int size) {
        if (categoryId == 0) {
            return boardRepository.findByTitleContaining(dto.getKeyword(), PageRequest.of(page - 1, size));
        }else {
            return boardRepository.findByCategoryIdAndTitleContaining(categoryId, dto.getKeyword(), PageRequest.of(page - 1, size));
        }
    }
}

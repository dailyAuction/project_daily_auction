package com.project.dailyAuction.board.service;

import com.project.dailyAuction.board.Dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {
    private final BoardRepository boardRepository;

    public void save(long memberId, BoardDto.Post postDto) {
        Board createdBoard = Board.builder()
                .title(postDto.getTitle())
                .description(postDto.getDescription())
                .image(postDto.getImage())
                .status(postDto.getStatus())
                .category(postDto.getCategory())
                .createdAt(LocalDateTime.now())
                .starting_price(postDto.getStarting_price())
                .build();

        boardRepository.save(createdBoard);
    }
}

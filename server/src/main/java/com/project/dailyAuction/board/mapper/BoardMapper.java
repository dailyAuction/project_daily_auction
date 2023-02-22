package com.project.dailyAuction.board.mapper;

import com.project.dailyAuction.board.dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    default List<BoardDto.Response> boardListToBoardDtoList(List<Board> boards){
        List<BoardDto.Response> responses = new ArrayList<>();
        for (Board board : boards) {
            BoardDto.Response response = BoardDto.Response.builder()
                    .boardId(board.getBoardId())
                    .sellerId(board.getSellerId())
                    .bidderId(board.getBidderId())
                    .description(board.getDescription())
                    .categoryId(board.getCategoryId())
                    //todo: 썸네일
                    .thumbnail(board.getThumbnail())
                    .createdAt(board.getCreatedAt())
                    .finishedAt(board.getFinishedAt())
                    .startingPrice(board.getStartingPrice())
                    .currentPrice(board.getCurrentPrice())
                    .title(board.getTitle())
                    .statusId(board.getStatusId())
                    .build();

            responses.add(response);
        }
        return responses;
    }
}

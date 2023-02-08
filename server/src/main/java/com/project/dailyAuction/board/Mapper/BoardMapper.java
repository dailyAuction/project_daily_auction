package com.project.dailyAuction.board.Mapper;

import com.project.dailyAuction.board.Dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    Board postDtoToEntity(BoardDto.Post postDto);
    BoardDto.Post entityToPostDto(Board board);

    default List<BoardDto.Response> boardListToBoardDtoList(List<Board> boards){
        List<BoardDto.Response> responses = new ArrayList<>();
        for (Board board : boards) {
            BoardDto.Response response = BoardDto.Response.builder()
                    .boardId(board.getBoardId())
                    .sellerId(board.getSellerId())
                    .bidderId(board.getBidderId())
                    .description(board.getDescription())
                    //todo : 썸네일도 필요
                    //todo : 이미지 리스트로 변경필요
                    .image(board.getImage())
                    .createdAt(board.getCreatedAt())
                    .finishedAt(board.getFinishedAt())
                    .startingPrice(board.getStartingPrice())
                    .title(board.getTitle())
                    .status(board.getStatus())
                    .history(board.getHistoryList())
                    .bidCount(board.getBidCount())
                    .currentPrice(board.getCurrentPrice())
                    .viewCount(board.getViewCount())
                    .build();

            responses.add(response);
        }
        return responses;
    }
}

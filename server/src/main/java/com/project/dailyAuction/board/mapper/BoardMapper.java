package com.project.dailyAuction.board.mapper;

import com.project.dailyAuction.board.dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    default List<BoardDto.Response> boardListToBoardDtoList(List<Board> boards, List<Integer> prices){
        List<BoardDto.Response> responses = new ArrayList<>();
        for (int i = 0; i < boards.size(); i++) {
            Board board = boards.get(i);
            BoardDto.Response response = BoardDto.Response.builder()
                    .boardId(board.getBoardId())
                    .authorId(board.getSellerId())
                    .bidderId(board.getBidderId())
                    .description(board.getDescription())
                    .categoryId(board.getCategoryId())
                    //todo: 썸네일
                    .thumbnail(board.getThumbnail())
                    .createdAt(board.getCreatedAt())
                    .finishedAt(board.getFinishedAt())
                    .startingPrice(board.getStartingPrice())
                    .currentPrice(prices.get(i))
                    .title(board.getTitle())
                    .statusId(board.getStatusId())
                    .build();

            responses.add(response);
        }
        return responses;
    }
    default List<BoardDto.Response> boardListToBoardDtoListWithMyPriceAndEmail(List<Board> boards,List<Integer> prices ,List<Integer> myPrices,List<String> sellerEmails){
        List<BoardDto.Response> responses = new ArrayList<>();
        for (int i = 0; i < boards.size(); i++) {
            Board board = boards.get(i);
            BoardDto.Response response = BoardDto.Response.builder()
                    .boardId(board.getBoardId())
                    .authorId(board.getSellerId())
                    .bidderId(board.getBidderId())
                    .description(board.getDescription())
                    .categoryId(board.getCategoryId())
                    //todo: 썸네일
                    .thumbnail(board.getThumbnail())
                    .createdAt(board.getCreatedAt())
                    .finishedAt(board.getFinishedAt())
                    .startingPrice(board.getStartingPrice())
                    .currentPrice(prices.get(i))
                    .title(board.getTitle())
                    .statusId(board.getStatusId())
                    .myPrice(myPrices.get(i))
                    .sellerEmail(sellerEmails.get(i))
                    .build();

            responses.add(response);
        }
        return responses;
    }
}

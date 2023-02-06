package com.project.dailyAuction.board.Mapper;

import com.project.dailyAuction.board.Dto.BoardDto;
import com.project.dailyAuction.board.entity.Board;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    Board postDtoToEntity(BoardDto.Post postDto);
    BoardDto.Post entityToPostDto(Board board);
}

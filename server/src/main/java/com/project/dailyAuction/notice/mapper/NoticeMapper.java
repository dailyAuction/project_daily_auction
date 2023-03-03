package com.project.dailyAuction.notice.mapper;

import com.project.dailyAuction.notice.entity.Notice;
import com.project.dailyAuction.notice.dto.NoticeResponseDto;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface NoticeMapper {
    default List<NoticeResponseDto> noticesTonoticeDtos(List<Notice> notices){
        List<NoticeResponseDto> responses = new ArrayList<>();
        for (Notice notice : notices) {
            NoticeResponseDto response = NoticeResponseDto.create(notice);
            responses.add(response);
        }
        return responses;
    }
}

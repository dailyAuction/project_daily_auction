package com.project.dailyAuction.search.mapper;

import com.project.dailyAuction.search.dto.TopKeywordsDto;
import com.project.dailyAuction.search.entity.Keyword;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface KeywordMapper {
    default TopKeywordsDto listToDto(List<Keyword> list){
        String[] keywordArr = new String[list.size()];
        for (int i = 0; i < list.size(); i++) {
            keywordArr[i] = list.get(i).getKeyword();
        }
        return TopKeywordsDto.builder()
                .keywords(keywordArr)
                .build();
    }
}

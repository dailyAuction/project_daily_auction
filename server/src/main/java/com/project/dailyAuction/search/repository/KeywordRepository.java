package com.project.dailyAuction.search.repository;

import com.project.dailyAuction.search.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface KeywordRepository extends JpaRepository<Keyword,Long> {
    Optional<Keyword> findByKeyword(String keyword);

    List<Keyword> findTop10ByOrderBySearchedCntDesc();

    @Modifying
    @Transactional
    @Query(value = "update keyword set searched_cnt =:searchedCnt where keyword =:keyword", nativeQuery = true)
    void updateSearchedCnt(String keyword, int searchedCnt);
}

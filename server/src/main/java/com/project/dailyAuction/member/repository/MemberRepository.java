package com.project.dailyAuction.member.repository;

import com.project.dailyAuction.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    int countByEmail(String email);
}

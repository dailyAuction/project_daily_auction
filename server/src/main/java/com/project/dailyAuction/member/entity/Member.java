package com.project.dailyAuction.member.entity;


import com.project.dailyAuction.code.MemberStatusCode;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private int coin;

    @Column
    private MemberStatusCode status;

    public void changePassword(String password){
        this.password = password;
    }

    public void changeStatus(MemberStatusCode status) {
        this.status = status;
    }
}

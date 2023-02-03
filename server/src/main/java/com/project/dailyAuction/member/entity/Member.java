package com.project.dailyAuction.member.entity;


import com.project.dailyAuction.code.MemberStatusCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

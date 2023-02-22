package com.project.dailyAuction.member.entity;


//import com.project.dailyAuction.boardNotice.entity.Notice;
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
    private long statusId;

//    @ManyToOne
//    @JoinColumn(name = "notice_id")
//    private Notice notice;

    public void setUserDetails(long memberId, String email, String password,int coin){
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.coin = coin;
    }
    public void changePassword(String password){
        this.password = password;
    }

    public void changeStatus(MemberStatusCode status) {
        this.statusId = status.getCode();
    }

    public void changeCoin(int newCoin){
        this.coin += newCoin;
    }
}

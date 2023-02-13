package com.project.dailyAuction.member.entity;



//import com.project.dailyAuction.boardNotice.entity.Notice;
import com.project.dailyAuction.code.MemberStatusCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
    private String status;

    @Column
    private String Participation;

//    @ManyToOne
//    @JoinColumn(name = "notice_id")
//    private Notice notice;

    public void setUserDetails(long memberId, String email, String password){
        this.memberId = memberId;
        this.email = email;
        this.password = password;
    }
    public void changePassword(String password){
        this.password = password;
    }

    public void changeStatus(MemberStatusCode status) {
        this.status = status.getMessage();
    }

    public void changeCoin(int newCoin){
        this.coin += newCoin;
    }

    public List<Long> getParticipationList(){
        if (this.Participation.equals("")){
            return new ArrayList<>();
        }
        String[] participations = this.Participation.split(",");

        return Arrays.stream(participations)
                .mapToLong(a-> Long.parseLong(a)).boxed()
                .collect(Collectors.toList());
    }
}

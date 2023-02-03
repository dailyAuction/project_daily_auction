package com.project.dailyAuction.EtcService;

import com.project.dailyAuction.etcService.RandomCodeService;
import com.project.dailyAuction.etcService.RandomPasswordService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EtcServiceTest {
    @InjectMocks
    static private RandomCodeService randomCodeService;
    @InjectMocks
    static private RandomPasswordService randomPasswordService;
    @Test
    @DisplayName("이메일 인증코드 생성 테스트")
    public void genCodeTest(){
        System.out.println("생성된 코드는 :[" + randomCodeService.genCode() + "]입니다.");
    }

    @Test
    @DisplayName("랜덤 비밀번호 생성 테스트")
    public void genPasswordTest(){
        System.out.println("생성된 비밀번호는 :[" + randomPasswordService.genPassword() + "]입니다.");
    }
}

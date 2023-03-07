package com.project.dailyAuction.EtcService;

import com.project.dailyAuction.etcService.RandomCodeService;
import com.project.dailyAuction.etcService.RandomPasswordService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@SpringBootTest
public class EtcServiceTest {
//    @InjectMocks
//    static private RandomCodeService randomCodeService;
//    @InjectMocks
//    static private RandomPasswordService randomPasswordService;
//
//    @Autowired
//    private JavaMailSender mailSender;


//    @Test
//    @DisplayName("이메일 인증코드 생성 테스트")
//    public void genCodeTest(){
//        System.out.println("생성된 코드는 :[" + randomCodeService.genCode() + "]입니다.");
//    }
//
//    @Test
//    @DisplayName("랜덤 비밀번호 생성 테스트")
//    public void genPasswordTest(){
//        System.out.println("생성된 비밀번호는 :[" + randomPasswordService.genPassword() + "]입니다.");
//    }
//
//    // yml에 메일관련 작성 필요
//    @Test
//    @DisplayName("이메일 전송 테스트")
//    public void sendEmailTest() throws MessagingException {
//        String password = randomPasswordService.genPassword();
//
//        MimeMessage message = mailSender.createMimeMessage();
//        message.addRecipients(MimeMessage.RecipientType.TO, "cjswo138@gmail.com");
//        message.setFrom("yeogiyo007@gmail.com");
//        message.setSubject("안녕하세요, 데일리옥션입니다.");
//        message.setText("<div>임시 비밀번호는 다음과 같습니다.\n" +
//                        password+
//                        "\n로그인 후 비밀번호를 꼭 변경해주세요<div>"
//                ,"utf-8","html");
//        mailSender.send(message);
//    }
}

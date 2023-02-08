package com.project.dailyAuction.etcService;

import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

@Service
@Transactional
@AllArgsConstructor
@Async
public class EmailService {
    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS = "yeogiyo007@gmail.com";

    public void verifyEmail(String address, String code) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, address);
        message.setFrom(FROM_ADDRESS);
        message.setSubject("안녕하세요, 데일리옥션입니다.");
        message.setText("인증 코드는 다음과 같습니다." +
                        code+
                        "사이트로 이동하여 회원가입을 마무리 하세요."
                ,"utf-8","html");
        mailSender.send(message);
    }

    public void findPassword(String address, String password) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, address);
        message.setFrom(FROM_ADDRESS);
        message.setSubject("안녕하세요, 데일리옥션입니다.");
        message.setText("<div>임시 비밀번호는 다음과 같습니다.\n" +
                        password+
                        "\n로그인 후 비밀번호를 꼭 변경해주세요<div>"
                ,"utf-8","html");
        mailSender.send(message);
    }

}

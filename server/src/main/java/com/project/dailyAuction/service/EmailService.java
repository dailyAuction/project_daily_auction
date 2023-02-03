package com.project.dailyAuction.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@Async
public class EmailService {
    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS = "cjswo138@gmail.com";

    public void verifyEmail(String email){

    }

    public void findPassword(String email){

    }

}

package com.project.dailyAuction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class DailyAuctionApplication {

	public static void main(String[] args) {
		SpringApplication.run(DailyAuctionApplication.class, args);
	}

}

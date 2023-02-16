package com.project.dailyAuction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@SpringBootApplication
@EnableAsync
@EnableScheduling
@EnableCaching
@EnableWebSocket
public class DailyAuctionApplication {

	public static void main(String[] args) {
		SpringApplication.run(DailyAuctionApplication.class, args);
	}

	// 웹소켓을 사용하기 위해 엔드포인트 설정
	@Bean
	public ServerEndpointExporter serverEndpointExporter() {
		return new ServerEndpointExporter();
	}
}

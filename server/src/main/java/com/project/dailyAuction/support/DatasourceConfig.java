//package com.project.dailyAuction.support;
//
//import com.zaxxer.hikari.HikariConfig;
//import com.zaxxer.hikari.HikariDataSource;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//
//import javax.sql.DataSource;
//

// 훗날 공부를 위해 남겨 둠 쓰레드 풀 설정
//@Configuration
//public class DatasourceConfig {
//
//    @Value("${spring.datasource.username}")
//    private String username;
//
//    @Value("${spring.datasource.password}")
//    private String password;
//
//    @Value("${spring.datasource.url}")
//    private String url;
//
//    @Bean
//    @Qualifier("dataSource")
//    @Primary
//    public DataSource oingDataSource() {
//        HikariConfig hikariConfig = new HikariConfig();
//
//        hikariConfig.setUsername(username);
//        hikariConfig.setPassword(password);
//        hikariConfig.setJdbcUrl(url);
//        hikariConfig.setMaximumPoolSize(20);
//        hikariConfig.setConnectionTimeout(40000);
//
//        return new HikariDataSource(hikariConfig);
//    }
//}

package com.project.dailyAuction.security.handler;

import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.member.service.MemberService;
import com.project.dailyAuction.security.jwt.JwtTokenizer;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@AllArgsConstructor
public class OAuthLoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email;
        List<String> authorities;
        //Google
        if (String.valueOf(oAuth2User.getAttributes()).startsWith("{s")) {
            email = "[goo]"+String.valueOf(oAuth2User.getAttributes().get("email"));
        }
        //Kakao
        else {
            Map<String, Object> map = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
            Map<String, Object> emailMap = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
            email = "[ka]"+String.valueOf(emailMap.get("email"));
        }
        // 이메일 등록 여부 체크
        long memberId = 0;
        Member member = memberService.findByEmailForOauth(email);
        if (member == null) {
            Member newMember = memberService.saveOauthMember(email);
            memberId = newMember.getMemberId();
            log.info("# Create new member");
        } else {
            memberId = member.getMemberId();
            log.info("# Already exits");
        }
        String accessToken = delegateAccessToken(email,memberId);
        String refreshToken = delegateRefreshToken(email);

        redirect(request, response, email, accessToken, refreshToken);

        log.info("# Authenticated successfully!");
    }

    private void saveRefreshTokenToRedis(String email, String refreshToken){

    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, String accessToken, String refreshToken) throws IOException {

        String uri = createURI(accessToken,refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(String email, long memberId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("memberId", memberId);

        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String email) {
        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access-token", "Bearer " + accessToken);
        queryParams.add("refresh-token", "Bearer " + accessToken);


        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(8080)
                .path("callback/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}

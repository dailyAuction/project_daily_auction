package com.project.dailyAuction.member.service;


import com.project.dailyAuction.board.mapper.BoardMapping;
import com.project.dailyAuction.board.entity.Board;
import com.project.dailyAuction.board.repository.BoardRepository;
import com.project.dailyAuction.boardMember.entity.BoardMember;
import com.project.dailyAuction.boardMember.repository.BoardMemberRepository;
import com.project.dailyAuction.code.ExceptionCode;
import com.project.dailyAuction.etcService.EmailService;
import com.project.dailyAuction.etcService.RandomCodeService;
import com.project.dailyAuction.etcService.RandomPasswordService;
import com.project.dailyAuction.member.dto.MemberDto;
import com.project.dailyAuction.member.entity.Member;
import com.project.dailyAuction.code.MemberStatusCode;
import com.project.dailyAuction.member.repository.MemberRepository;
import com.project.dailyAuction.security.jwt.JwtTokenizer;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.*;

@Service
@AllArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final BoardMemberRepository boardMemberRepository;
    private final JwtTokenizer jwtTokenizer;
    private final EmailService emailService;
    private final RandomCodeService randomCodeService;
    private final RandomPasswordService randomPasswordService;
    private final RedisTemplate<String, String> redisTemplate;

    // 멤버 저장
    public Member save(Member member, String password) {
        verifyExistEmail(member.getEmail());
        member.changePassword(passwordEncoder().encode(password));
        return memberRepository.save(member);
    }

    // 정보 수정
    public Member update(String accessToken, MemberDto.Update dto) {
        Member member = findByAccessToken(accessToken);
        verifyPassword(member, dto.getCurrentPassword());

        String newPassword = passwordEncoder().encode(dto.getNewPassword());
        member.changePassword(newPassword);
        return member;
    }

    // 비밀번호 체크
    public void verifyPassword(Member member, String password) {
        if (!passwordEncoder().matches(password, member.getPassword())) {
            throw new ResponseStatusException(ExceptionCode.WRONG_PASSWORD.getCode(), ExceptionCode.WRONG_PASSWORD.getMessage(), new IllegalArgumentException());
        }
    }

    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // 존재하는 이메일 체크
    public void verifyExistEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            throw new ResponseStatusException(ExceptionCode.MEMBER_EXISTS.getCode(), ExceptionCode.MEMBER_EXISTS.getMessage(), new IllegalArgumentException());
        }
    }

    public Member find(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(ExceptionCode.MEMBER_NOT_FOUND.getCode(), ExceptionCode.MEMBER_NOT_FOUND.getMessage(), new IllegalArgumentException()));
    }

    // 액세스토큰으로 멤버 찾기
    public Member findByAccessToken(String accessToken) {
        long memberId = jwtTokenizer.getMemberId(accessToken);
        return find(memberId);
    }

    // 이메일로 멤버 찾기
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(
                        () -> new ResponseStatusException(ExceptionCode.MEMBER_NOT_FOUND.getCode(), ExceptionCode.MEMBER_NOT_FOUND.getMessage(), new IllegalArgumentException())
                );
    }

    // 이메일로 멤버 수 체크
    public int countByEmail(String email) {
        return memberRepository.countByEmail(email);
    }

    public Member saveOauthMember(String email) {
        return memberRepository.save(Member.builder()
                .email(email)
                .password(passwordEncoder().encode("epdlffldhrtusthtufqlalfqjsgh"))
                .coin(0)
                .statusId(1)
                .build()
        );
    }

    public Member findByEmailForOauth(String email) {

        return memberRepository.findByEmail(email).orElse(null);
    }

    public void delete(String token) {
        Member member = findByAccessToken(token);
        member.changeStatus(MemberStatusCode.탈퇴회원);
        boardRepository.deleteBySellerId(member.getMemberId());
    }

    // 이메일이 있으면 에러 , 없으면 인증코드를 보내줌
    public String checkEmail(MemberDto.Email dto) throws MessagingException {
        String email = dto.getEmail();
        if (memberRepository.countByEmail(email) == 1) {
            throw new ResponseStatusException(ExceptionCode.MEMBER_EXISTS.getCode(), ExceptionCode.MEMBER_EXISTS.getMessage(), new IllegalArgumentException());
        }

        String code = randomCodeService.genCode();
        emailService.verifyEmail(email, code);
        return code;
    }

    // 이메일이 없으면 에러 , 있으면 새로운 비밀번호를 보내줌
    public void findPassword(MemberDto.Email dto) throws MessagingException {
        String email = dto.getEmail();
        if (memberRepository.countByEmail(email) == 0) {
            throw new ResponseStatusException(ExceptionCode.MEMBER_NOT_FOUND.getCode(), ExceptionCode.MEMBER_NOT_FOUND.getMessage(), new IllegalArgumentException());
        }
        Member member = findByEmail(email);
        String newPassword = randomPasswordService.genPassword();
        emailService.findPassword(email, newPassword);

        member.changePassword(passwordEncoder().encode(newPassword));
    }

    public int addCoin(String token, MemberDto.Coin coin) {
        Member member = findByAccessToken(token);
        member.changeCoin(coin.getCoin());

        return member.getCoin();
    }

    public MemberDto.MyPage getMyPage(String token) {
        Member member = findByAccessToken(token);

        return MemberDto.MyPage.builder()
                .email(member.getEmail())
                .coin(member.getCoin())
                .memberId(member.getMemberId())
                .build();
    }

    public Page<Board> getMyAuction(String token, int page, int size) {
        Member member = findByAccessToken(token);

        return boardRepository.findBySellerId(member.getMemberId(), PageRequest.of(page - 1, size));
    }

    public Page<Board> getParticipation(String token, int page, int size) {
        Member member = findByAccessToken(token);

        List<Long> participationList = new ArrayList<>();
        List<BoardMapping> list = boardMemberRepository.findAllByMember(member);
        for (BoardMapping map : list) {
            participationList.add(map.getBoard().getBoardId());
        }
        return boardRepository.findAllByBoardIdIn(participationList, PageRequest.of(page - 1, size));
    }

    public String genAccessToken(String refreshToken) {
        long memberId = getRefreshTokenOwnerInRedis(refreshToken);
        Member member = memberRepository.findById(memberId).get();
        return delegateAccessToken(member);
    }

    private Long getRefreshTokenOwnerInRedis(String refreshToken) {
        Set<String> redisKeys = redisTemplate.keys("refreshToken*");
        Iterator<String> it = redisKeys.iterator();
        while (it.hasNext()) {
            String data = it.next();
            Long memberId = Long.parseLong(data.split("::")[1]);

            if (redisTemplate.opsForValue().get(data).equals(refreshToken)) {
                return memberId;
            }
        }
        throw new ResponseStatusException(ExceptionCode.EXPIRED_TOKEN.getCode(), ExceptionCode.EXPIRED_TOKEN.getMessage(), new IllegalArgumentException());
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("memberId", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    public List<Integer> findMyPrices(String token, List<Board> boards) {
        List<Integer> list = new ArrayList<>();
        Member member = findByAccessToken(token);

        for (int i = 0; i < boards.size(); i++) {
            Board board = boards.get(i);
            Optional<BoardMember> optionalBoardMember = boardMemberRepository.findByBoardAndMember(board, member);

            int price = 0;

            if (optionalBoardMember.isEmpty()) {
                price = optionalBoardMember.get().getMyPrice();
            }
            list.add(price);
        }
        return list;
    }
}

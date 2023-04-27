# 🪙Project_Daily_Auction
<img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/main.jpg">

#### 당신의 일상 속 소소한 경매를 도와드립니다. 데일리 옥션!
   

## 👉프로젝트 소개
창고 구석에 있는 골동품 얼마에 팔지 고민되시나요?   
가지고 계신 물건의 가치를 알고 싶으신가요?   
경매를 통해 가격을 결정해 보세요!

누구나 쉽고 빠르게, 일일 경매를 진행할 수 있는 서비스
**“데일리 옥션”** 입니다.

주어진 시간은 단 24시간! 
매력적인 문구로 인기 상품을 **“직접 경매”** 해보세요!

카카오, 구글 계정만 있으면 로그인 ok!   
상품 이미지와 설명을 등록하면 24시간 경매 시작!

당신의 경매가 진행되는 것을 **“실시간”** 으로 확인해보세요!

#### 배포 링크👉 <a href="http://dailyauction.site">http://dailyauction.site</a>
#### 테스트 계정 
<p>ID : test@<hi>test.com</p>
<p>PW : test1234@</p>

## 📆프로젝트 기간
*2023/01/31 ~ 2023/03/06* (5주)

## 🗣기획 / 협업 과정
- **기획 아이템 선정**   
새로운 기술 스택을 학습하고, 실시간 통신에 대한 경험을 쌓기 위해 기획했습니다. 
- **요구사항 정의**   
문서화를 통해 백엔드, 프론트간 서비스 이해도를 향상시키기 위해 노력했습니다.
- **프로토타입 설계 / ERD 및 API 설계**   
프로토 타입을 기반으로 필요한 데이터를 논의하고 설계했습니다. REST API 원칙을 지키기 위해 노력했습니다. 
- **개발과정**   
  - **1주차** : 와이어프레임과 서비스 설계 위주로 진행했습니다.
  - **2주차 ~ 4주차** : 코어타임을 준수하며 요구사항에 맞게 서비스를 개발했습니다. 
  - **5주차** : AWS S3 와 EC2를 통한 서비스 배포를 진행했습니다. 

|**프로토 타입**|**요구사항 정의서**|
|:-:|:-:|
|<a href="https://www.figma.com/file/EruPDY4ljbba0H442rES6k/%EB%8D%B0%EC%9D%BC%EB%A6%AC-%EC%98%A5%EC%85%98?node-id=0%3A1&t=8JtZ8r5VgRGiS1cr-1"><img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/readme1.png"></a>|<a href="https://docs.google.com/spreadsheets/d/1eA0DrcsMQVfrVcueWP3xH4EueExcl0PKA2HXubzB63w/edit#gid=0"><img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/readme2.png"></a>|
|**기획 과정**|**API 명세서**|
<a href="https://www.figma.com/file/FbSFvVjEm5yFrn3t3WwIFa/%EB%8D%B0%EC%9D%BC%EB%A6%AC-%EC%98%A5%EC%85%98-%ED%94%BC%EA%B7%B8%EC%9E%BC?node-id=0%3A1&t=a5UnXLQBpmphKGOg-1"><img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/readme3.png"></a>|<a href="https://docs.google.com/spreadsheets/d/1eA0DrcsMQVfrVcueWP3xH4EueExcl0PKA2HXubzB63w/edit#gid=944558665"><img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/readme4.png"></a>|
|**ERD 설계**|**회의록**|
<img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/readme5.png">|<img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/readme6.png">|

## 📃팀 규칙
- 코어 타임 : 13:00 ~ 18:00
- 데일리 스크럼 2회 
- 쿠션어를 사용한 소통
- 코드리뷰 문화
- 협업 툴
  - 깃헙, 디스코드, 노션, 피그마, 피그잼
- 동료 피드백
  - 동료의 성장을 응원하기 위해 서로 피드백을 진행했습니다.


## 👪팀원 정보
|박혜정 (FE / 팀장)|김재훈 (FE / 서기)|정희찬 (FE)|강병재 (BE)|조성웅 (BE)|
|:-:|:-:|:-:|:-:|:-:|
|<img src="https://avatars.githubusercontent.com/u/89173923?v=4" width=150>|<img src="https://avatars.githubusercontent.com/u/107684690?v=4" width=150 >|<img src="https://pre-032-bucket.s3.ap-northeast-2.amazonaws.com/profile_green.png" width=150>|<img src="https://avatars.githubusercontent.com/u/107945688?v=4" width=150>|<img src="https://avatars.githubusercontent.com/u/104243252?v=4" width=150>|
|[@hyejj19](https://github.com/hyejj19)|[@halmokme](https://github.com/halmokme)|[@raon9401](https://github.com/raon9401)| [@casava840](https://github.com/casava840)   |[@woong-sung](https://github.com/woong-sung)|

### 맡은 역할

<details>
<summary>박혜정</summary>

- **담당 페이지**
  - 상품 상세페이지
  - 검색페이지, 검색 결과 페이지
- **구현 내용**
  - 실시간 경매, 데이터 통신
  - SSE 사용한 실시간 알림 수신
  - 차트 적용한 데이터 시각화
  - React suspense, React.lazy 활용한 코드 분할, 성능 최적화
  - EsLint, prettier 세팅 / 커스텀 훅 패턴 도입 깃헙 액션 자동배포 파이프라인 구축
</details>

<details>
<summary>김재훈</summary>

- **담당 페이지**
  - 메인페이지
  - 상품등록페이지
  - 내가 참여한 경매
  - 내가 등록한 경매
  - 컴포넌트(공통)
- **구현 내용**
  - 이미지(browser-image-compression, heic2any)
  - 무한스크롤(react-intersection-observer)

</details>

<details>
<summary>정희찬</summary>

- **담당 페이지**
  - 로그인, 소셜 로그인
  - 회원가입
  - 마이 페이지(회원 관리) - 비밀번호 변경 - 회원 탈퇴
  - 코인 충전 페이지
- **구현 내용**
  - axios interceptor를 이용한 로그인 갱신
  - react-hook-form을 이용한 유효성 검사
  - recoil effect를 이용한 로컬 스토리지와 Atom의 연결
  - Oauth2.0 을 이용한 소셜 로그인
</details>

<details>
<summary>강병재</summary>

- **맡은 역할**
  - 경매
  - 알림 기능
  - 이미지 업로드
  - AWS S3, EC2, RDS배포
  - ROUTE53 을 통한 DNS 연결
- **사용한 기술**
  - SpringJPA, Spring Boot
  - SSE
  - S3, EC2, RDS
  - Thumbnailator 라이브러리
</details>

<details>
<summary>조성웅</summary>

- **맡은 역할**
  - 회원 가입, 관리, 마이페이지 
  - 실시간 경매 기능
  - 검색, 정렬 기능
  - 기타 서비스 (이메일 인증, 비밀번호 찾기)
  - 캐싱 
- **사용한 기술**
  - SpringJPA, Spring Framework, Spring Boot
  - Spring Security, JWT, Oauth2
  - REDIS
  - Websocket
  - Cookie를 이용한 조회수 중복 처리
  - NativeQuery
  - 이메일 전송 (비동기)
  - S3, EC2
</details>




## 📺DEMO Gif
|로그인|회원가입 & 이메일 인증|경매상품 조회|
|:-:|:-:|:-:|
|<img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/login.gif" width=220>|<img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/sign.gif" width=220>|<img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/details.gif" width=220>|
|**경매 입찰**|**상품등록**|**검색 & 조회**|
|<img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/bid.gif" width=220>|<img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/post.gif" width=220>|<img src="https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/readme/search.gif" width=220>|


## ⭐Stacks
#### DEPLOY

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white"> <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white"> <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">


#### FRONT-END

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white"> <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=React%20Hook%20Form&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white">

#### BACK-END

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://camo.githubusercontent.com/49befa32300e8d3f71282963743f863d1eed0856ff4073fbcff0f25675912db5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e672053656375726974792d3644423333463f7374796c653d666f722d7468652d6261646765266c6f676f3d537072696e67205365637572697479266c6f676f436f6c6f723d7768697465"> <img src="https://camo.githubusercontent.com/ef6c19e247d89935d87fb7ea73b33f638e108fd495b65b5efd9e828bc1f36455/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e672044617461204a50412d3041424635333f7374796c653d666f722d7468652d6261646765"> <img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white">

## Git commit message
|태그|설명|
|:-:|:-:|
|feat|새로운 기능 추가|
|fix|버그 수정|
|docs|문서|
|design|컴포넌트 디자인|
|style|(formatting, missing semi colons, …)|
|refactor|코드 리팩토링|
|test|테스트 관련|
|chore|기타 수정|

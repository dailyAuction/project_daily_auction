import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    withCredentials: true,
  },
});

// TODO : 1. access token이 필요한경우와 필요하지않은 경우로 나누기 필요.
//        2. 로그인 만료 시 알림 모달 추가.
// 기능 : access token 만료시 refresh token 으로 access token 재요청
httpClient.interceptors.request.use(
  (config) => {
    // access 토큰 유무에 따라 access 토큰을 심어서 보냄.
    let token: string | null = localStorage.getItem('access') || null;

    // 엑세스 토큰 재요청 url
    if (config.url === '/members/refresh-token') {
      token = localStorage.getItem('refresh');
    }

    // 토큰이 존재할 경우
    if (token !== null) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    console.log('인터셉터 요청 에러 : ', error);
    Promise.reject(error);
  }
);

// 기능 : 리프레시 토큰으로 엑세스 토큰 재발급
const getAccessToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh');
    return await httpClient
      .get('/members/refresh-token', {
        headers: {
          RefreshToken: refresh.replace('Bearer ', ''),
        },
      })
      .then((res) => {
        return res?.headers.authorization;
      });
  } catch (error) {
    // 리프레시 토큰 만료 에러 핸들링
    console.log('리프레시 토큰 만료', error);
    localStorage.clear();
    window.location.href = '/login';
  }
};

httpClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { config, response } = error;

    // 에러의 response가 없으면 error 리턴
    // - 다른 에러로 response.status 가 없을 수 있음.
    if (!response || config.url === '/members/refresh-token') {
      return Promise.reject(error);
    }

    // 리프레시 토큰으로 엑세스 토큰 재발급
    const accessToken = await getAccessToken();
    if (response.status === 401) {
      localStorage.setItem('access', `Bearer ${accessToken}`);
      config.headers.Authorization = `Bearer ${accessToken}`;
      return axios(config);
    }

    return Promise.reject(error);
  }
);

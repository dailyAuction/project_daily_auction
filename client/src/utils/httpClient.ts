import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    withCredentials: true,
  },
});

// 작성자 : 정희찬
// 기능 : access token 만료시 refresh token 으로 access token 재요청
httpClient.interceptors.request.use((config) => {
  let token: string | null = null;
  if (config.url === '/members/refresh-token') {
    token = localStorage.getItem('refresh');
    config.headers.Authorization = JSON.parse(`${token}`);
  } else {
    token = localStorage.getItem('access');
    config.headers.Authorization = JSON.parse(`${token}`);
  }

  if (config.headers?.Authorization === undefined) {
    console.log('이 응답에는 토큰이 없습니다.');
  }

  return config;
});

// 기능 : 리프레시 토큰으로 엑세스 토큰 재발급 API
const refreshAPI = {
  get: async (token: string) => {
    const res = await httpClient.get('/members/refresh-token', {
      headers: {
        RefreshToken: token.replace('Bearer ', ''),
      },
    });
    return res?.headers.authorization;
  },
};

httpClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const navigate = useNavigate();
    const {
      config,
      response: { status },
    } = error;

    /** 1 */
    if (config.url === '/members/refresh-token' || status !== 401 || config.sent) {
      return Promise.reject(error);
    }

    /** 2 */
    config.sent = true;
    // 리프레시 토큰으로 엑세스 토큰 재발급
    const accessToken = await refreshAPI.get(JSON.parse(localStorage.getItem('refresh'))).catch((refreshErr) => {
      console.log('리프레시 토큰 만료 ', refreshErr);
      localStorage.clear();
      navigate(-1);
    });

    if (accessToken) {
      localStorage.setItem('access', JSON.stringify(`Bearer ${accessToken}`));
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return axios(error.config);
  }
);

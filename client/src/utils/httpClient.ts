import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    withCredentials: true,
  },
});

// 기능 : access token 만료시 refresh token 으로 access token 재요청
httpClient.interceptors.request.use(
  (config) => {
    let token: string | null = null;

    if (config.url === '/members/refresh-token') {
      token = localStorage.getItem('refresh');
    } else {
      token = localStorage.getItem('access');
    }

    if (token !== null) {
      config.headers.Authorization = JSON.parse(`${token}`);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 기능 : 리프레시 토큰으로 엑세스 토큰 재발급
const getAccessToken = async () => {
  try {
    const refresh = JSON.parse(localStorage.getItem('refresh'));
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

    // 에러 응답이 없으면 error 리턴 - 다른 에러로 response.status 가 없을 수 있음.
    if (!response || config.url === '/members/refresh-token') {
      return Promise.reject(error);
    }

    // 리프레시 토큰으로 엑세스 토큰 재발급
    const accessToken = await getAccessToken();
    if (response.status === 401) {
      localStorage.setItem('access', JSON.stringify(`Bearer ${accessToken}`));
      config.headers.Authorization = `Bearer ${accessToken}`;
      return axios(config);
    }

    return Promise.reject(error);
  }
);

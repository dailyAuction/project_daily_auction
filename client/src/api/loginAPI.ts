import { MemberAuthData } from '../types/member.type';
import { httpClient } from '../utils/httpClient';

type LoginData = MemberAuthData;

export const loginAPI = {
  // 로그인 요청
  loginUrl: '/login',
  post: async (userInfo: LoginData) => {
    const res = await httpClient.post<LoginData>(loginAPI.loginUrl, userInfo);
    return res.headers;
  },

  // 이메일 인증 요청
  emailUrl: '/members/forgot-password',
  postForgotPassword: async (email: string) => {
    const res = await httpClient.post(loginAPI.emailUrl, email);
    return res.data;
  },
};

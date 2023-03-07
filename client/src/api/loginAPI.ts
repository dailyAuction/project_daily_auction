import { MemberAuthData } from '../types/member.type';
import { httpClient } from '../utils/httpClient';

type LoginData = MemberAuthData;

export const loginAPI = {
  loginUrl: '/login',
  post: async (userInfo: LoginData) => {
    const res = await httpClient.post(loginAPI.loginUrl, userInfo);
    return res.headers;
  },

  emailUrl: '/members/forgot-password',
  postForgotPassword: async (email: string) => {
    await httpClient.post(loginAPI.emailUrl, email);
  },
};

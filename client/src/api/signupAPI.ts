import { MemberAuthData } from '../types/member.type';
import { httpClient } from '../utils/httpClient';

type SignUpData = MemberAuthData;

type VerifyCodeFactor = {
  verifyCode: string;
};

export const signupAPI = {
  url: '/members',

  // 회원가입
  post: async (data: SignUpData) => {
    await httpClient.post<SignUpData>(`${signupAPI.url}/signup`, data);
  },

  // 이메일 인증 요청
  postVerified: async (email: string) => {
    const res = await httpClient.post<VerifyCodeFactor>(`${signupAPI.url}/verification`, email);
    return res.data;
  },
};

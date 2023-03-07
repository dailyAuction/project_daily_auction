import { MemberAuthData } from '../types/member.type';
import { httpClient } from '../utils/httpClient';

type SignUpData = MemberAuthData;

type VerifyCodeFactor = {
  verifyCode: string;
};

export const signupAPI = {
  url: '/members',
  postSignUp: async (data: SignUpData) => {
    await httpClient.post<SignUpData>(`${signupAPI.url}/signup`, data);
  },

  postVerified: async (email: string) => {
    const res = await httpClient.post<VerifyCodeFactor>(`${signupAPI.url}/verification`, { email });
    return res.data.verifyCode;
  },
};

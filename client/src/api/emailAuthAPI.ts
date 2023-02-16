import { httpClient } from '../utils/httpClient';

type VerifyCodeFactor = {
  verifyCode: string;
};

export const emailAuthAPI = {
  url: '/members',

  postVerifed: async (email: string) => {
    const res = await httpClient.post<VerifyCodeFactor>(`${emailAuthAPI.url}/verification`, email);
    return res.data;
  },

  postForgotPassword: async (email: string) => {
    const res = await httpClient.post(`${emailAuthAPI.url}/forgot-password`, email);
    return res.data;
  },
};

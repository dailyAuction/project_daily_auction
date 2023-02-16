import { httpClient } from '../utils/httpClient';

type VerifyCodeFactor = {
  verifyCode: string;
};
export const verifedAPI = {
  url: '/verification',
  post: async (email: string) => {
    const res = await httpClient.post<VerifyCodeFactor>(verifedAPI.url, email);
    return res.data;
  },
};

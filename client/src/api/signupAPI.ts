import { MemberAuthData } from '../types/member.type';
import { httpClient } from '../utils/httpClient';

type SignUpData = MemberAuthData;

export const signupAPI = {
  url: '/signup',
  post: async (data: SignUpData) => {
    await httpClient.post<SignUpData>(signupAPI.url, data);
  },
};

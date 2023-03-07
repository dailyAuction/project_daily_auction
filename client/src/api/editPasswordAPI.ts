import { httpClient } from '../utils/httpClient';

type PasswordFactor = {
  data: object;
};

export const editPasswordAPI = {
  url: '/members/password',
  patch: async ({ data }: PasswordFactor) => {
    await httpClient.patch<PasswordFactor>(editPasswordAPI.url, { ...data });
  },
};

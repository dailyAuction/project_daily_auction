import { httpClient } from '../utils/httpClient';

type PasswordFactor = {
  data: object;
  token?: string;
};

export const editPasswordAPI = {
  url: '/members/password',
  patch: async ({ data, token }: PasswordFactor) => {
    await httpClient.patch<PasswordFactor>(
      editPasswordAPI.url,
      { ...data },
      {
        headers: { Authorization: token },
      }
    );
  },
};

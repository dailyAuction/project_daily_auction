import { httpClient } from '../utils/httpClient';

type SignOutFactor = {
  token?: string;
};

export const signoutAPI = {
  url: '/members/withdrawal',
  patch: async ({ token }: SignOutFactor) => {
    await httpClient.patch<SignOutFactor>(
      signoutAPI.url,
      {},
      {
        headers: { Authorization: token },
      }
    );
  },
};

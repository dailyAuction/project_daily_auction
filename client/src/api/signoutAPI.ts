import { httpClient } from '../utils/httpClient';

export const signoutAPI = {
  url: '/members/withdrawal',
  patch: async () => {
    await httpClient.patch(signoutAPI.url, {});
  },
};

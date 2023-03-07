import { httpClient } from '../utils/httpClient';

export const postProductAPI = {
  post: async (formData: FormData, token: string) => {
    const res = await httpClient.post('/boards', formData, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  },
};

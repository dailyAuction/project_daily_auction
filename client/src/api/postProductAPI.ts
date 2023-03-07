import { httpClient } from '../utils/httpClient';

export const postProductAPI = {
  post: async (formData: FormData) => {
    const res = await httpClient.post('/boards', formData);
    return res.data;
  },
};

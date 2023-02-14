import axios from 'axios';
import { ProductDetailResp } from '../types/product.type';

type SearchAPIFactor = {
  categoryId: string;
  keyword?: string;
  page?: number;
  size?: number;
};

export const searchAPI = {
  get: async ({ categoryId, keyword = '', page = 1, size = 10 }: SearchAPIFactor) => {
    const res = await axios.get<ProductDetailResp[]>(`/${categoryId}/search?page=${page}&size=${size}`);
    return res.data;
  },
  getTop10: () => null,
};

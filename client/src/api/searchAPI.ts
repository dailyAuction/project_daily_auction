import axios from 'axios';
import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type SearchAPIFactor = {
  categoryId: string;
  keyword?: string;
  page?: number;
  size?: number;
};

export const searchAPI = {
  get: async ({ categoryId, keyword = '', page = 1, size = 10 }: SearchAPIFactor) => {
    const res = await httpClient.get<ProductDetailResp[]>(
      `/${categoryId}/search?page=${page}&size=${size}&keyword-${keyword}`
    );
    return res.data;
  },
  getTop10: () => null,
};

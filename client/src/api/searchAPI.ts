import { httpClient } from '../utils/httpClient';
import { ProductListResp } from '../types/product.type';

type SearchAPIFactor = {
  categoryId: string;
  keyword?: string;
  page?: number;
  size?: number;
};

type TopKeywordsResp = {
  keywords: string[];
};

export const searchAPI = {
  get: async ({ categoryId, keyword = '', page = 1, size = 10 }: SearchAPIFactor) => {
    const res = await httpClient.get<ProductListResp>(
      `/${categoryId}/search/?page=${page}&size=${size}&keyword=${encodeURI(keyword)}`
    );
    return res.data;
  },
  getTop10: async () => {
    const res = await httpClient.get<TopKeywordsResp>(`/top-searched-keyword`);
    return res.data;
  },
};

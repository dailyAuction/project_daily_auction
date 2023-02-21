import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type BestProductAPIFactor = {
  path: string;
};

export const mainPageAPI = {
  getClosing: async () => {
    const res = await httpClient.get<ProductDetailResp[]>('/imminent-item');
    return res.data;
  },
  getBest: async ({ path }: BestProductAPIFactor) => {
    const res = await httpClient.get<ProductDetailResp[]>(`/${path}`);
    return res.data;
  },
};

import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type BestProductAPIFactor = {
  path: string;
};

export const bestProductAPI = {
  get: async ({ path }: BestProductAPIFactor) => {
    const res = await httpClient.get<ProductDetailResp[]>(`/${path}`);
    return res.data;
  },
};

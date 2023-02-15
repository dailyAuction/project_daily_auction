import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type bestProductAPIFactor = {
  path: string;
};

export const bestProductAPI = {
  get: async ({ path }: bestProductAPIFactor) => {
    const res = await httpClient.get<ProductDetailResp[]>(`/${path}`);
    return res.data;
  },
};

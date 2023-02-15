import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type MyAuctionListAPIFactor = {
  path: string;
};

export const bestProductAPI = {
  get: async ({ path }: MyAuctionListAPIFactor) => {
    const res = await httpClient.get<ProductDetailResp[]>(`/${path}`);
    return res.data;
  },
};

import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type MyAuctionListAPIFactor = {
  sort: string;
  page?: number;
  size?: number;
};

export const myAuctionListAPI = {
  get: async ({ sort, page = 1, size = 10 }: MyAuctionListAPIFactor) => {
    const res = await httpClient.get<ProductDetailResp[]>(
      `/members/${sort}/my-auction-list/?page=${page}&size=${size}`
    );
    return res.data;
  },
};

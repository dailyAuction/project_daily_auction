import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type MyAuctionListAPIFactor = {
  sort: string;
  path: string;
  page?: number;
  size?: number;
};

type MyPageProduct = {
  items: ProductDetailResp;
};

export const myPageAPI = {
  getMyAuctionList: async ({ sort, path, page = 1, size = 10 }: MyAuctionListAPIFactor) => {
    const res = await httpClient.get<MyPageProduct>(`/members/${sort}/${path}/?page=${page}&size=${size}`);
    return res.data;
  },
};

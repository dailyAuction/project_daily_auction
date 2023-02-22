import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type MyAuctionListAPIFactor = {
  path: string;
  page?: number;
  size?: number;
  token?: string;
};

type MyPageProduct = {
  items: ProductDetailResp;
};

export const myPageAPI = {
  getMyAuctionList: async ({ path, page = 1, size = 10, token }: MyAuctionListAPIFactor) => {
    const res = await httpClient.get<MyPageProduct>(`/members/${path}/?page=${page}&size=${size}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  },
};

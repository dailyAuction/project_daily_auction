import { MemberInfo } from '../types/member.type';
import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type MyAuctionListAPIFactor = {
  path: string;
  page?: number;
  size?: number;
};

type MyPageProduct = {
  items: ProductDetailResp;
};

export const myPageAPI = {
  getMyAuctionList: async ({ path, page = 1, size = 10 }: MyAuctionListAPIFactor) => {
    const res = await httpClient.get<MyPageProduct>(`/members/${path}/?page=${page}&size=${size}`);
    return res.data;
  },
};

export const myInfoAPI = {
  get: async () => {
    const res = await httpClient.get<MemberInfo>('/members/my-page');
    return res.data;
  },
};

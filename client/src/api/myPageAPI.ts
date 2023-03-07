import { MemberInfo } from '../types/member.type';
import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type MyAuctionListAPIFactor = {
  path: string;
  page?: number;
  size?: number;
  token?: string;
};

type MyPageProduct = {
  items: ProductDetailResp[];
};

export const myPageAPI = {
  getMyAuctionList: async ({ path, page, size, token }: MyAuctionListAPIFactor) => {
    const res = await httpClient.get<MyPageProduct>(`/members/${path}/?page=${page}&size=${size}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  },
};

export const myInfoAPI = {
  get: async (token: string) => {
    const res = await httpClient.get<MemberInfo>('/members/my-page', {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  },
};

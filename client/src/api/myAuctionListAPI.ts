import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type MyAuctionListAPIFactor = {
  sort: string;
  page?: number;
  size?: number;
};

const location = document.location.href.split('/')[4];
const url = location === 'auctionList' ? 'my-auction-list' : location === 'joinList' ? 'participation-list' : '';

export const myAuctionListAPI = {
  get: async ({ sort, page = 1, size = 10 }: MyAuctionListAPIFactor) => {
    const res = await httpClient.get<ProductDetailResp[]>(`/members/${sort}/${url}/?page=${page}&size=${size}`);
    return res.data;
  },
};

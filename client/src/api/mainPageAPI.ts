import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type MainPageProduct = {
  items: ProductDetailResp[];
};

type GetBestProduct = {
  path: string;
  page?: number;
  size?: number;
};

export const mainPageAPI = {
  getClosing: async () => {
    const res = await httpClient.get<MainPageProduct>('/imminent-item');
    return res.data;
  },
  getBest: async ({ path, page, size = 10 }: GetBestProduct) => {
    const res = await httpClient.get<MainPageProduct>(`/${path}/?page=${page}&size=${size}`);
    return res.data;
  },
};

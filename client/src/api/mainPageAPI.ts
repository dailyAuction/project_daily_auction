import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type MainPageProduct = {
  items: ProductDetailResp[];
};

export const mainPageAPI = {
  getClosing: async () => {
    const res = await httpClient.get<MainPageProduct>('/imminent-item');
    return res.data;
  },
  getBest: async (path: string) => {
    const res = await httpClient.get<MainPageProduct>(`/${path}`);
    return res.data;
  },
};

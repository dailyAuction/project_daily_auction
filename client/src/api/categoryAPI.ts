import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

type CategoryProduct = {
  items: ProductDetailResp[];
};

type GetCatogoryProduct = {
  sort: number;
  categoryId: string;
  page?: number;
  size?: number;
};

export const categoryProductAPI = {
  get: async ({ sort, categoryId, page = 1, size = 10 }: GetCatogoryProduct) => {
    const res = await httpClient.get<CategoryProduct>(`/boards/${sort}/${categoryId}/?page=${page}&size=${size}`);
    return res.data;
  },
};

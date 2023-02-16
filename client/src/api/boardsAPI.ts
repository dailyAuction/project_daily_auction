import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

export const productDetailAPI = {
  url: `/boards`,

  get: (path: string) => httpClient.get<ProductDetailResp>(`${productDetailAPI.url}/${path}`),

  postBid: (path: string, newPrice: number) => httpClient.post(`${productDetailAPI.url}/${path}/bidding`, { newPrice }),

  delete: (path: string) => httpClient.delete(`${productDetailAPI.url}/${path}`),
};

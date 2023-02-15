import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

export const productDetailAPI = {
  url: `/boards`,
  get: (path: string) => httpClient.get<ProductDetailResp>(`${productDetailAPI.url}/${path}`),
  delete: (path: string) => httpClient.delete(`${productDetailAPI.url}/${path}`),
};

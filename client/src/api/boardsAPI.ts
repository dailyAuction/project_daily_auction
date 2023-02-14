import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

export const productDetailAPI = {
  url: `${process.env.REACT_APP_URL}/boards`,
  get: (path: string) => httpClient.get<ProductDetailResp>(`/${path}`),
  delete: (path: string) => httpClient.delete(`/${path}`),
};

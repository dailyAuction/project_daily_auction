import axios from 'axios';
import { ProductDetailResp } from '../types/product.type';

export const productDetailAPI = {
  url: `${process.env.REACT_APP_URL}/boards`,
  get: (path: string) => axios.get<ProductDetailResp>(`${productDetailAPI.url}/${path}`),
  delete: (path: string) => axios.delete(`${productDetailAPI.url}/${path}`),
};

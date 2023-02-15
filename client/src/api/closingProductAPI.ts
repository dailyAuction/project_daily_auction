import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

export const closingProductAPI = {
  get: async () => {
    const res = await httpClient.get<ProductDetailResp[]>('/dddimminent-item');
    return res.data;
  },
};

import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

export const productDetailAPI = {
  url: `/boards`,

  get: (path: string, token: string) => {
    const option = token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : null;

    return httpClient.get<ProductDetailResp>(`${productDetailAPI.url}/${path}`, option);
  },

  postBid: (path: string, newPrice: number) => httpClient.post(`${productDetailAPI.url}/${path}/bidding`, { newPrice }),

  delete: (path: string) => httpClient.delete(`${productDetailAPI.url}/${path}`),
};

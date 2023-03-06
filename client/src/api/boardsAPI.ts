import { ProductDetailResp } from '../types/product.type';
import { httpClient } from '../utils/httpClient';

// TODO: 메서드 정의 방식 화살표 => 단축문법으로 변경
// TODO: 인터셉터 기능 완성되면 option 객체 및 token 주입 제거하기
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

  delete: (path: string, token: string) =>
    httpClient.delete(`${productDetailAPI.url}/${path},`, {
      headers: {
        Authorization: token,
      },
    }),
};

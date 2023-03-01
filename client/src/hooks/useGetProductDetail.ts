import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { productDetailAPI } from '../api/boardsAPI';
import { accessTokenAtom } from '../atoms/token';

export const useGetProductDetail = (boardId: string) => {
  const accessToken = useRecoilValue(accessTokenAtom);

  const { isLoading, error, data } = useQuery(
    // 각 상품 데이터가 unique한 key 값을 갖도록 배열로 정했습니다.
    ['productDetail', boardId],
    async () => {
      const res = await productDetailAPI.get(boardId, accessToken);
      return res.data;
    },
    {
      refetchOnMount: true,
      onError: (e) => console.error(e),
    }
  );

  return { data, isLoading, error };
};

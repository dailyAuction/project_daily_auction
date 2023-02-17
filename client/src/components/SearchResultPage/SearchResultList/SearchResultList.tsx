import { useQuery } from 'react-query';
import { useGetQueryString } from '../../../hooks/useGetQueryString';
import { ProductItem } from '../../_common/ProductItem/ProductItem';
import { searchAPI } from '../../../api/searchAPI';

export const SearchResultList = () => {
  const [categoryId, keyword] = useGetQueryString().split('_');

  const { isLoading, error, data } = useQuery('productDetail', () => searchAPI.get({ categoryId, keyword }), {
    onError: (e) => console.error(e),
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>검색 결과를 찾지 못하였습니다.</div>;

  // TODO: 무한 스크롤 구현하기
  return (
    <section className="flex flex-col space-y-3">
      {data && data.map((product) => <ProductItem productDetail={product} key={product.boardId} />)}
    </section>
  );
};

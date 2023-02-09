import { useGetQueryString } from '../../../hooks/useGetQueryString';
import { ProductItem } from '../../_common/\bProductItem/ProductItem';
import { products } from '../../../mock/product';

export const SearchResultList = () => {
  const [categoryId, keyword] = useGetQueryString().split('_');

  // TODO: 검색 요청 api 함수 만들기
  // props로 productItem 컴포넌트에 데이터 전달

  return (
    <section className="flex flex-col space-y-3">
      {products.map((product) => (
        <ProductItem productDetail={product} key={product.boardId} />
      ))}
    </section>
  );
};

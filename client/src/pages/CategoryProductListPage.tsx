import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { MainHeader } from '../components/_common/Header/MainHeader/MainHeader';
import { CategoryList } from '../components/_common/CategoryList/CategoryList';
import { CATEGORIES } from '../constants/constants';
import { ProductItem } from '../components/_common/ProductItem/ProductItem';
import { products } from '../mock/product';

export const CategoryProductListPage = () => {
  const { id } = useParams();
  const [sortState, setSortState] = useState(0);

  // TODO : srotState가 변할때 마다 요청 로직 필요
  return (
    <main className="base-layout bg-white">
      <section className="w-full">
        <MainHeader>{CATEGORIES[Number(id)]}</MainHeader>
        <CategoryList sortState={sortState} setSortState={setSortState} />
      </section>
      <section className="w-full h-full overflow-y-scroll scrollbar-hide ">
        {/* TODO : 상품 리스트 조회 추가 */}
        <article className="px-[10px] mb-[10px] flex flex-col space-y-3">
          {products.map((product) => (
            <ProductItem productDetail={product} key={product.boardId} />
          ))}
        </article>
      </section>
      <section className="w-full">
        <TabBar />
      </section>
    </main>
  );
};

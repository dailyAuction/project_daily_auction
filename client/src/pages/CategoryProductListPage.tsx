import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { MainHeader } from '../components/_common/Header/MainHeader/MainHeader';
import { CategoryList } from '../components/_common/CategoryList/CategoryList';
import { CATEGORIES } from '../constants/constants';
import { ProductItem } from '../components/_common/\bProductItem/ProductItem';

export const CategoryProductListPage = () => {
  const { id } = useParams();
  const [sortState, setSortState] = useState(0);

  // 테스트용
  const testArr: number[] = [];
  for (let i = 0; i < 100; i++) {
    testArr[i] = i;
  }

  // TODO : srotState가 변할때 마다 요청 로직 필요
  return (
    <main className="base-layout bg-white">
      <section className="w-full">
        <MainHeader>{CATEGORIES[Number(id)]}</MainHeader>
        <CategoryList sortState={sortState} setSortState={setSortState} />
      </section>
      <section className="w-full overflow-y-scroll scrollbar-hide">
        {/* TODO : 상품 리스트 조회 추가 */}
        <article className="px-[10px] space-y-3 mb-[10px]">
          {testArr.map((item) => (
            <ProductItem key={item} isLoginUser status={'진행중'} />
          ))}
        </article>
      </section>
      <section className="w-full">
        <TabBar />
      </section>
    </main>
  );
};

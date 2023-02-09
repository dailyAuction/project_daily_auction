import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { MainHeader } from '../components/_common/Header/MainHeader/MainHeader';
import { CategoryList } from '../components/_common/CategoryList/CategoryList';
import { CATEGORIES } from '../constants/constants';

export const CategoryProductListPage = () => {
  const { id } = useParams();
  const [sortState, setSortState] = useState(0);

  // srotState가 변할때 마다 요청 로직 필요
  return (
    <main className="base-layout bg-white">
      <MainHeader>{CATEGORIES[Number(id)]}</MainHeader>
      <section className="w-full">
        <CategoryList sortState={sortState} setSortState={setSortState} />
        {/* TODO : 상품 리스트 조회 추가 */}
      </section>
      <TabBar />
    </main>
  );
};

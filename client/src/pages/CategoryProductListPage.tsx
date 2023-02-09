import { TabBar } from '../components/_common/TabBar/TabBar';
import { MainHeader } from '../components/_common/Header/MainHeader/MainHeader';
import { CategoryList } from '../components/_common/CategoryList/CategoryList';

export const CategoryProductListPage = () => {
  return (
    <main className="base-layout">
      <MainHeader>카테고리 선택</MainHeader>
      <CategoryList />
      <TabBar />
    </main>
  );
};

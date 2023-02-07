import { TabBar } from '../components/TabBar';
import { MainHeader } from '../components/Header/MainHeader';
import { CategoryList } from '../components/CategoryList';

export const CategoryProductListPage = () => {
  return (
    <main className="base-layout">
      <MainHeader>카테고리 선택</MainHeader>
      <CategoryList />
      <TabBar />
    </main>
  );
};

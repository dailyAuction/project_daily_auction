import { useParams } from 'react-router-dom';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { MainHeader } from '../components/_common/Header/MainHeader/MainHeader';
import { CategoryList } from '../components/_common/CategoryList/CategoryList';
import { CATEGORIES } from '../constants/constants';

export const CategoryProductListPage = () => {
  const { id } = useParams();
  return (
    <main className="base-layout">
      <MainHeader>{CATEGORIES[Number(id)]}</MainHeader>
      <CategoryList />
      <TabBar />
    </main>
  );
};

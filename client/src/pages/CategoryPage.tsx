import { TabBar } from '../components/TabBar';
import { SubHeader } from '../components/Header/SubHeader';
import { CategoryPageBtn } from '../components/CategoryPageBtn';
import { CATEGORIES } from '../constants/constants';

export const CategoryPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>카테고리</SubHeader>
      <section className=" my-4 grid grid-cols-3 gap-4">
        {CATEGORIES.map((item) => (
          <CategoryPageBtn key={item}>{item}</CategoryPageBtn>
        ))}
      </section>
      <TabBar />
    </main>
  );
};

import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { CategoryPageBtn } from '../components/CategoryPage/CategoryPageBtn/CategoryPageBtn';
import { CATEGORIES } from '../constants/constants';

export const CategoryPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>카테고리</SubHeader>
      <section className=" my-4 grid grid-cols-3 gap-4">
        {CATEGORIES.map((item: string, index) => (
          <CategoryPageBtn id={index} key={item}>
            {item}
          </CategoryPageBtn>
        ))}
      </section>
      <TabBar />
    </main>
  );
};

import { CategoryBtn } from '../CategoryBtn/CategoryBtn';
import { CATEGORIES } from '../../../constants/constants';

export const CategoryList = () => {
  return (
    <nav className="h-14 w-full p-2 overflow-x-scroll">
      <section className="w-max space-x-3">
        {CATEGORIES.map((item: string) => (
          <CategoryBtn key={item}>{item}</CategoryBtn>
        ))}
      </section>
    </nav>
  );
};

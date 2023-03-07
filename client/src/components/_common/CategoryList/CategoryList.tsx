import { SetStateAction } from 'react';
import { CATEGORIE_SORT_STATUS } from '../../../constants/constants';

type CategoryFactor = {
  sortState: number;
  setSortState: React.Dispatch<SetStateAction<number>>;
  setIsClick: React.Dispatch<SetStateAction<boolean>>;
};

export const CategoryList = ({ sortState, setSortState, setIsClick }: CategoryFactor) => {
  const handleClickCatogry = (index: number) => {
    setSortState(index);
    setIsClick(true);
  };

  return (
    <nav className="h-full p-2 pb-4 overflow-x-scroll scrollbar-hide">
      <section className="w-max space-x-3">
        {CATEGORIE_SORT_STATUS.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`category-btn ${sortState === index && 'bg-main-red text-white pointer-events-none'}`}
            onClick={() => handleClickCatogry(index)}>
            {item}
          </button>
        ))}
      </section>
    </nav>
  );
};

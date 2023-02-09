import { CATEGORIE_SORT_STATUS } from '../../../constants/constants';

export const CategoryList = ({ sortState, setSortState }) => {
  return (
    <nav className="h-full p-2 pb-4 overflow-x-scroll scrollbar-hide">
      <section className="w-max space-x-3">
        {CATEGORIE_SORT_STATUS.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`category-btn ${sortState === index && 'bg-main-red text-white pointer-events-none'}`}
            onClick={() => setSortState(index)}>
            {item}
          </button>
        ))}
      </section>
    </nav>
  );
};

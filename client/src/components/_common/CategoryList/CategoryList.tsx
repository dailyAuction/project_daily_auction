import { CATEGORIE_SORT_STATUS } from '../../../constants/constants';

export const CategoryList = ({ sortState, setSortState }) => {
  return (
    <nav className="h-14 p-2 overflow-x-scroll scrollbar-hide">
      <section className="w-max space-x-3">
        {CATEGORIE_SORT_STATUS.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`category-btn ${sortState === index ? 'bg-main-red text-white pointer-events-none' : ''}`}
            onClick={() => setSortState(index)}>
            {item}
          </button>
        ))}
      </section>
    </nav>
  );
};

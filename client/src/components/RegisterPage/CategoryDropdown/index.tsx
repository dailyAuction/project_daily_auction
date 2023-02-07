import { CategoryBtn } from '../../CategoryBtn';
import { CATEGORIES } from '../../../constants/constants';

export const CategoryDropdown = () => {
  return (
    <div className=" w-full h-screen">
      <div className="relative">
        <button type="button" className="relative flex justify-between align-middle p-2.5 w-full bg-white">
          카테고리
          <svg className="h-5 w-5 text-lg ">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="h-[100px] mt-2 py-2 bg-white rounded-md shadow-xl z-20">
          {CATEGORIES.map((item) => {
            return <CategoryBtn key={item}>{item}</CategoryBtn>;
          })}
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { CategoryBtn } from '../../_common/CategoryBtn/CategoryBtn';
import { CATEGORIES } from '../../../constants/constants';

export const CategoryDropdown = ({ productInfo, setProductInfo }) => {
  const [open, setOpen] = useState(false);

  const handlerOnClickDropdown = () => {
    setOpen(!open);
  };

  const handlerOnClickCategory = (idx: number) => {
    setProductInfo({ ...productInfo, categoryId: idx + 1 });
    setOpen(false);
  };

  return (
    <div className="w-full border-y-2">
      <div className="relative">
        <button
          type="button"
          className={`relative flex justify-between align-middle p-2.5 w-full cursor-auto ${open && 'bg-white'}`}>
          <p className="">카테고리</p>
          <div className="flex flex-1 ml-6">{CATEGORIES[productInfo.categoryId]}</div>
          {open ? (
            <svg
              onClick={handlerOnClickDropdown}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-1 cursor-pointer hover:stroke-2 stroke-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          ) : (
            <svg
              onClick={handlerOnClickDropdown}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-1 cursor-pointer hover:stroke-2 stroke-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          )}
          {}
        </button>
        {open && (
          <div className="absolute flex flex-wrap items-center w-full h-20 mt-2 pl-2 py-2 bg-white rounded-md z-20">
            {CATEGORIES.slice(1).map((item, idx) => {
              return (
                <div key={item} onClick={() => handlerOnClickCategory(idx)}>
                  <CategoryBtn key={item}>{CATEGORIES[idx + 1]}</CategoryBtn>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

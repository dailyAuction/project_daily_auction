import { Link } from 'react-router-dom';

export const CategoryPageBtn = ({ children, id }) => {
  // 버튼 누르면 -> 해당 카테고리로 전달.
  return (
    <Link to={`/categoryProduct/${id}`}>
      <button
        type="button"
        className="flex justify-center items-center text-lg font-bold w-[100px] h-[100px] text-main-brown rounded-[10px] border-[1px] border-[#E8E2E2] bg-white active:bg-main-orange active:text-white">
        {children}
      </button>
    </Link>
  );
};

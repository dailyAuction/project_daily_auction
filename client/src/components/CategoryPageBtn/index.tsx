import { Link } from 'react-router-dom';

export const CategoryPageBtn = ({ children }) => {
  return (
    <Link to="/categoryProduct">
      <div className="flex justify-center items-center text-lg font-bold w-[100px] h-[100px] text-main-brown rounded-[10px] border-[1px] border-[#E8E2E2] bg-white active:bg-main-orange active:text-white">
        {children}
      </div>
    </Link>
  );
};

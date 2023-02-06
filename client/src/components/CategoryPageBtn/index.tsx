export const CategoryPageBtn = ({ children }) => {
  return (
    <button
      type="button"
      className="text-lg font-bold w-[100px] h-[100px] text-main-brown rounded-[10px] border-[1px] border-[#E8E2E2] bg-white active:bg-main-orange active:text-white">
      {children}
    </button>
  );
};

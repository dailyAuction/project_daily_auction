export const CategoryBtn = ({ children }) => {
  return (
    <button
      type="button"
      className="bg-white rounded-[10px] mx-1 px-2.5 shadow-lg h-[23px] hover:bg-main-red hover:text-white">
      <div className="text-xs">{children}</div>
    </button>
  );
};

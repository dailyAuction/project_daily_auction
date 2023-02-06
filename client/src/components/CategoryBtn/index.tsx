export const CategoryBtn = ({ children }) => {
  return (
    <button
      type="button"
      className={`bg-white rounded-[10px] px-2.5 shadow-lg h-[23px] hover:bg-main-red hover:text-white ${
        children.length > 2 ? 'w-[84px]' : 'w-[48px]'
      }`}>
      <div className="text-xs">{children}</div>
    </button>
  );
};

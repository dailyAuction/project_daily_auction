export const CategoryBtn = ({ children }) => {
  return (
    <button type="button" className="category-btn">
      <div className="text-xs">{children}</div>
    </button>
  );
};

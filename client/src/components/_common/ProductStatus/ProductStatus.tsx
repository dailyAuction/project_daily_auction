export const ProductStatus = ({ children }) => {
  return (
    <div className="text-sm">
      {children === '진행중' ? (
        <div className="text-[#68B984]">{children}</div>
      ) : children === '유찰' ? (
        <div className="text-[#3496DD]">{children}</div>
      ) : (
        <div className="text-main-red">{children}</div>
      )}
    </div>
  );
};

import { ProductItemImg } from '../../_common/ProductItemImg/ProductItemImg';

export const ClosingProduct = ({ closingProductDetail }) => {
  return (
    <div className=" w-full min-h-1/5">
      <div className="flex items-center">
        <h1 className="text-lg m-2 mr-1 font-bold">마감 임박</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full">
        {closingProductDetail.map((el) => {
          return (
            <div key={el.boardId} className="flex flex-col ml-2 min-w-[120px] w-[120px]">
              <ProductItemImg thumbnail={el.thumbnail} />
              <p className="text-xs line-clamp-1">{el.title}</p>
              <p className="text-base text-main-orange">{el.currentPrice} coin</p>
            </div>
          );
        })}
        {closingProductDetail.map((el) => {
          return (
            <div key={el.boardId} className="flex flex-col ml-2 min-w-[120px] w-[120px]">
              <ProductItemImg thumbnail={el.thumbnail} />
              <p className="text-xs line-clamp-1">{el.title}</p>
              <p className="text-base text-main-orange">{el.currentPrice} coin</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { ProductItem } from '../../_common/\bProductItem/ProductItem';

export const MyAuctionContent = ({ details, status }) => {
  const viewDataFilter = details.filter((el) => el.statusId === status);

  return (
    <div className="h-4/5 overflow-x-auto scrollbar-hide flex flex-col gap-2">
      {viewDataFilter.map((el) => {
        return <ProductItem key={el.boardId} productDetail={el} />;
      })}
      {viewDataFilter.map((el) => {
        return <ProductItem key={el.boardId} productDetail={el} />;
      })}
      {viewDataFilter.map((el) => {
        return <ProductItem key={el.boardId} productDetail={el} />;
      })}
    </div>
  );
};

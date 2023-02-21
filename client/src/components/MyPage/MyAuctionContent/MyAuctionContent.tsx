import { ProductItem } from '../../_common/ProductItem/ProductItem';

export const MyAuctionContent = ({ details, status }) => {
  const viewDataFilter = details?.items.filter((el) => el.statusId === status);

  return (
    <div className="w-full px-2.5 h-4/5 overflow-x-auto scrollbar-hide flex flex-col gap-2">
      {viewDataFilter?.map((el) => {
        return <ProductItem key={el.boardId} productDetail={el} />;
      })}
    </div>
  );
};

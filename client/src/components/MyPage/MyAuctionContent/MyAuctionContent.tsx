import { ProductItem } from '../../_common/ProductItem/ProductItem';

export const MyAuctionContent = ({ details, status }) => {
  return (
    <div className="w-full px-2.5 h-4/5 overflow-x-auto scrollbar-hide flex flex-col gap-2">
      {details?.pages.map((page) => {
        const filterData = page.items.filter((data) => data.statusId === status + 1);
        return (
          filterData[0] && (
            <div key={crypto.randomUUID()} className="flex flex-col gap-2">
              {filterData.map((el) => {
                return <ProductItem key={el.boardId} productDetail={el} />;
              })}
            </div>
          )
        );
      })}
    </div>
  );
};

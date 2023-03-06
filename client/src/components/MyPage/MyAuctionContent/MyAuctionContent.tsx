import { ProductItem } from '../../_common/ProductItem/ProductItem';

export const MyAuctionContent = ({ data, statusId }) => {
  return (
    <div className="w-full px-2.5 flex flex-col gap-2 pb-20">
      {data?.pages.map((page) => {
        const filterData = page.items.filter((item) => item.statusId === statusId + 1);
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

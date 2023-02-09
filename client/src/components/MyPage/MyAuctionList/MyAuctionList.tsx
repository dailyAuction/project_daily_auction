import { useState } from 'react';
import { products } from '../../../mock/product';
import { ProductItem } from '../../_common/\bProductItem/ProductItem';
import { SubHeader } from '../../_common/Header/SubHeader/SubHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { MyAuctionBtn } from '../MyAuctionBtn/MyAuctionBtn';

export const MyAuctionList = () => {
  const [status, setStatus] = useState(0);
  const [myAuctionList] = useState(products);

  return (
    <div className="base-layout">
      <SubHeader>내가 등록한 경매</SubHeader>
      {/* button */}
      <MyAuctionBtn status={status} setStatus={setStatus} />

      {/* itemList */}
      <div className="h-4/5 overflow-x-auto scrollbar-hide">
        {myAuctionList.map((el) => {
          return <ProductItem key={el.boardId} productDetail={el} />;
        })}
        {myAuctionList.map((el) => {
          return <ProductItem key={el.boardId} productDetail={el} />;
        })}{' '}
        {myAuctionList.map((el) => {
          return <ProductItem key={el.boardId} productDetail={el} />;
        })}
      </div>

      <TabBar />
    </div>
  );
};

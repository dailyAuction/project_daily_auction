import { useState } from 'react';
import { products } from '../../../mock/product';
import { SubHeader } from '../../_common/Header/SubHeader/SubHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { MyAuctionBtn } from '../MyAuctionBtn/MyAuctionBtn';
import { MyAuctionContent } from '../MyAuctionContent/MyAuctionContent';

export const MyAuctionList = () => {
  const [status, setStatus] = useState(0);
  const [details] = useState(products);

  return (
    <div className="base-layout bg-white">
      <SubHeader>내가 등록한 경매</SubHeader>
      <MyAuctionBtn status={status} setStatus={setStatus} />
      <MyAuctionContent details={details} status={status} />
      <TabBar />
    </div>
  );
};

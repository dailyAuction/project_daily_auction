import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ProductDetailResp } from '../../../types/product.type';
import { SubHeader } from '../../_common/Header/SubHeader/SubHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { MyAuctionBtn } from '../MyAuctionBtn/MyAuctionBtn';
import { MyAuctionContent } from '../MyAuctionContent/MyAuctionContent';
import { AUCTION_STATUS } from '../../../constants/constants';
import { myAuctionListAPI } from '../../../api/myAuctionListAPI';

export const MyJoinList = () => {
  const [status, setStatus] = useState(0);

  const { isLoading, error, data } = useQuery(
    'myJoin',
    () => myAuctionListAPI.get({ sort: '', path: 'participation-list' }),
    { staleTime: 1000 * 20 }
  );

  return (
    <div className="base-layout bg-white">
      <SubHeader>내가 참여한 경매</SubHeader>
      <MyAuctionBtn status={status} setStatus={setStatus} />
      {isLoading && <div>Loading...</div>}
      {error && <div>{`${AUCTION_STATUS[status]} 상품이 없습니다.`}</div>}
      <MyAuctionContent details={data} status={status} />
      <TabBar />
    </div>
  );
};

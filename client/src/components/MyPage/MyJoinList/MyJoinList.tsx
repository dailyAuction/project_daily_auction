import { useState } from 'react';
import { useQuery } from 'react-query';
import { SubHeader } from '../../_common/Header/SubHeader/SubHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { MyAuctionBtn } from '../MyAuctionBtn/MyAuctionBtn';
import { MyAuctionContent } from '../MyAuctionContent/MyAuctionContent';
import { AUCTION_STATUS } from '../../../constants/constants';
import { myPageAPI } from '../../../api/myPageAPI';

export const MyJoinList = () => {
  const [status, setStatus] = useState(0);

  const { isLoading, error, data } = useQuery(
    'myJoin',
    () => myPageAPI.getMyAuctionList({ sort: '', path: 'participation-list' }),
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

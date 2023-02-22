import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { SubHeader } from '../../_common/Header/SubHeader/SubHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { MyAuctionBtn } from '../MyAuctionBtn/MyAuctionBtn';
import { MyAuctionContent } from '../MyAuctionContent/MyAuctionContent';
import { AUCTION_STATUS } from '../../../constants/constants';
import { myPageAPI } from '../../../api/myPageAPI';
import { accessTokenAtom } from '../../../atoms/token';

export const MyAuctionList = () => {
  const [status, setStatus] = useState(0);
  const [token] = useRecoilState(accessTokenAtom);

  const { isLoading, error, data } = useQuery(
    'myAuction',
    () => myPageAPI.getMyAuctionList({ path: 'my-auction-list', token }),
    { staleTime: 1000 * 20 }
  );

  return (
    <div className="base-layout bg-white">
      <SubHeader>내가 등록한 경매</SubHeader>
      <MyAuctionBtn status={status} setStatus={setStatus} />
      {isLoading && <div>Loading...</div>}
      {error && <div>{`${AUCTION_STATUS[status]} 상품이 없습니다.`}</div>}
      <MyAuctionContent details={data} status={status} />
      <TabBar />
    </div>
  );
};

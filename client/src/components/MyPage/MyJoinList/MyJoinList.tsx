import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { SubHeader } from '../../_common/Header/SubHeader/SubHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { MyAuctionBtn } from '../MyAuctionBtn/MyAuctionBtn';
import { MyAuctionContent } from '../MyAuctionContent/MyAuctionContent';
import { AUCTION_STATUS } from '../../../constants/constants';
import { myPageAPI } from '../../../api/myPageAPI';
import { accessTokenAtom } from '../../../atoms/token';
import { Loading } from '../../_common/Loading/Loading';

export const MyJoinList = () => {
  const [status, setStatus] = useState(0);
  const token = useRecoilValue(accessTokenAtom);
  const { isLoading, error, data } = useQuery(
    'myJoin',
    () => myPageAPI.getMyAuctionList({ path: 'participation-list', token }),
    { staleTime: 1000 * 20 }
  );

  return (
    <div className="base-layout bg-white">
      <SubHeader>내가 참여한 경매</SubHeader>
      <MyAuctionBtn status={status} setStatus={setStatus} />
      {isLoading && <Loading />}
      {error && <div>{`${AUCTION_STATUS[status]} 상품이 없습니다.`}</div>}
      <MyAuctionContent details={data} status={status} />
      <TabBar />
    </div>
  );
};

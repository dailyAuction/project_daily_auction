import { useState } from 'react';
import { SubHeader } from '../../_common/Header/SubHeader/SubHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { MyAuctionBtn } from '../MyAuctionBtn/MyAuctionBtn';
import { MyAuctionContent } from '../MyAuctionContent/MyAuctionContent';

export const MyJoinList = () => {
  const [statusId, setStatusId] = useState(0);

  return (
    <div className="base-layout bg-white">
      <SubHeader>내가 참여한 경매</SubHeader>
      <MyAuctionBtn status={statusId} setStatus={setStatusId} />
      <MyAuctionContent statusId={statusId} />
      <div className="fixed bottom-0 w-full sm:w-[500px]">
        <TabBar />
      </div>
    </div>
  );
};

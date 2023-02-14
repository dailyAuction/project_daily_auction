import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ProductDetailResp } from '../../../types/product.type';
import { SubHeader } from '../../_common/Header/SubHeader/SubHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { MyAuctionBtn } from '../MyAuctionBtn/MyAuctionBtn';
import { MyAuctionContent } from '../MyAuctionContent/MyAuctionContent';
import { AUCTION_STATUS } from '../../../constants/constants';

export const MyJoinList = () => {
  const [status, setStatus] = useState(0);

  const getMyJoin = async () => {
    const { data } = await axios.get<ProductDetailResp[]>(`${process.env.REACT_APP_URL}/members/0/participation-list`, {
      params: {
        page: '',
        size: '',
      },
      headers: {
        Authorization: `Bearer token`,
      },
    });
    return data;
  };

  const {
    data: myJoinList,
    isLoading,
    isError,
  } = useQuery<ProductDetailResp[], Error>('myJoinList', getMyJoin, {
    staleTime: 1000 * 20,
    retry: 0,
    onError: (e) => console.log(e.message),
  });

  return (
    <div className="base-layout bg-white">
      <SubHeader>내가 참여한 경매</SubHeader>
      <MyAuctionBtn status={status} setStatus={setStatus} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>{`${AUCTION_STATUS[status]} 상품이 없습니다.`}</div>}
      <MyAuctionContent details={myJoinList} status={status} />
      <TabBar />
    </div>
  );
};
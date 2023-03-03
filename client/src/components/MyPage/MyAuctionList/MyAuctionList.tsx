/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/dot-notation */
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { accessTokenAtom } from '../../../atoms/token';
import { SubHeader } from '../../_common/Header/SubHeader/SubHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { MyAuctionBtn } from '../MyAuctionBtn/MyAuctionBtn';
import { MyAuctionContent } from '../MyAuctionContent/MyAuctionContent';
import { myPageAPI } from '../../../api/myPageAPI';
import { Loading } from '../../_common/Loading/Loading';
import { AUCTION_STATUS } from '../../../constants/constants';

export const MyAuctionList = () => {
  const [statusId, setStatusId] = useState(0);
  const token = useRecoilValue(accessTokenAtom);
  const currPage = useLocation().pathname.split('/').at(-1);
  const path = currPage === 'auctionList' ? 'my-auction-list' : 'participation-list';

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['myAuction', `${statusId}`],
    ({ pageParam = 0 }) => {
      pageParam++;
      return myPageAPI.getMyAuctionList({ path, page: pageParam, token });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalPage = lastPage['pageInfo']?.totalPages;
        const nextPage = allPages.length;
        return nextPage <= totalPage && nextPage;
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  return (
    <div className="base-layout bg-white">
      <div className="fixed top-0 w-full sm:w-[500px] z-[10000]">
        <SubHeader>내가 등록한 경매</SubHeader>
      </div>
      <MyAuctionBtn status={statusId} setStatus={setStatusId} fetchNextPage={fetchNextPage} />
      {status === 'loading' && <Loading />}
      {status === 'error' && <div>{`${AUCTION_STATUS[statusId]} 상품이 없습니다.`}</div>}
      <MyAuctionContent data={data} statusId={statusId} />
      <div className="fixed bottom-0 w-full sm:w-[500px]">
        <TabBar />
      </div>
      <div>
        <button type="button" className="text-white" ref={ref} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? <Loading /> : hasNextPage ? '더보기' : ' '}
        </button>
      </div>
    </div>
  );
};

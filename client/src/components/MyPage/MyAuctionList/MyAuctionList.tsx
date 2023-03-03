/* eslint-disable @typescript-eslint/dot-notation */
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { SubHeader } from '../../_common/Header/SubHeader/SubHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { MyAuctionBtn } from '../MyAuctionBtn/MyAuctionBtn';
import { MyAuctionContent } from '../MyAuctionContent/MyAuctionContent';
import { AUCTION_STATUS } from '../../../constants/constants';
import { myPageAPI } from '../../../api/myPageAPI';
import { accessTokenAtom } from '../../../atoms/token';
import { Loading } from '../../_common/Loading/Loading';

export const MyAuctionList = () => {
  const [statusId, setStatusId] = useState(0);
  const token = useRecoilValue(accessTokenAtom);
  const [isClick, setIsClick] = useState(true);

  // const { isLoading, error, data } = useQuery(
  //   'myAuction',
  //   () => myPageAPI.getMyAuctionList({ path: 'my-auction-list', token }),
  //   { staleTime: 1000 * 20 }
  // );

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['myAuction', `${statusId}`],
    ({ pageParam = 1 }) => myPageAPI.getMyAuctionList({ path: 'my-auction-list', page: pageParam, token }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalPage = lastPage['pageInfo']?.totalPages;
        const nextPage = allPages.length;
        return nextPage <= totalPage && nextPage;
      },
      enabled: isClick,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  return (
    <div className="base-layout bg-white">
      <SubHeader>내가 등록한 경매</SubHeader>
      <MyAuctionBtn status={statusId} setStatus={setStatusId} />
      {status === 'loading' && <Loading />}
      {status === 'error' && <div>{`${AUCTION_STATUS[statusId]} 상품이 없습니다.`}</div>}
      <MyAuctionContent details={data} status={statusId} />
      <button
        type="button"
        disabled={!hasNextPage || isFetchingNextPage}
        className="text-opacity-20"
        ref={ref}
        onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? <Loading /> : hasNextPage ? 'more' : ''}
      </button>
      <TabBar />
    </div>
  );
};

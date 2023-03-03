/* eslint-disable @typescript-eslint/dot-notation */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { myPageAPI } from '../../../api/myPageAPI';
import { accessTokenAtom } from '../../../atoms/token';
import { Loading } from '../../_common/Loading/Loading';
import { ProductItem } from '../../_common/ProductItem/ProductItem';
import { AUCTION_STATUS } from '../../../constants/constants';

export const MyAuctionContent = ({ statusId }) => {
  const token = useRecoilValue(accessTokenAtom);
  const pagelocation = useLocation().pathname.split('/').at(-1);
  const path = pagelocation === 'auctionList' ? 'my-auction-list' : 'participation-list';

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['myAuction', `${statusId}`],
    ({ pageParam = 1 }) => myPageAPI.getMyAuctionList({ path, page: pageParam, token }),
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
    <div className="w-full px-2.5 h-4/5 flex flex-col gap-2">
      {status === 'loading' && <Loading />}
      {status === 'error' && <div>{`${AUCTION_STATUS[statusId]} 상품이 없습니다.`}</div>}
      {data?.pages.map((page) => {
        const filterData = page.items.filter((item) => item.statusId === statusId + 1);
        console.log(filterData.length);
        return (
          filterData[0] && (
            <div key={crypto.randomUUID()} className="flex flex-col gap-2">
              {filterData.map((el) => {
                return <ProductItem key={el.boardId} productDetail={el} />;
              })}
            </div>
          )
        );
      })}
      <button type="button" disabled={!hasNextPage || isFetchingNextPage} ref={ref} onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? <Loading /> : hasNextPage ? '더보기' : ''}
      </button>
    </div>
  );
};

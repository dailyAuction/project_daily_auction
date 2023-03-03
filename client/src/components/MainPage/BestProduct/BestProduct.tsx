/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/dot-notation */
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { ProductItem } from '../../_common/ProductItem/ProductItem';
import { CATEGORIES } from '../../../constants/constants';
import { mainPageAPI } from '../../../api/mainPageAPI';
import { Loading } from '../../_common/Loading/Loading';
import { ToList } from '../ToList/ToList';

export const Bestproduct = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [isClick, setIsClick] = useState(true);
  const path = categoryId ? `${categoryId}/popular-item` : 'all-popular-item';

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['bestProduct', `${categoryId}`],
    ({ pageParam = 0 }) => {
      pageParam++;
      return mainPageAPI.getBest({ path, page: pageParam });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalPage = lastPage['pageInfo']?.totalPages;
        const nextPage = allPages.length;
        return nextPage <= totalPage && nextPage; // 끝까지 다 봤을때는 return되는 값이 없어야한다
      },
      enabled: isClick,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  const handleClickCategory = (idx) => {
    setCategoryId(idx);
    setIsClick(true);
  };

  return (
    <div className="w-full">
      <div className="flex items-center">
        <h1 className="text-lg m-2 mr-1 font-bold">카테고리별 인기상품</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
          />
        </svg>
      </div>
      <div className="p-2 pb-4 overflow-x-scroll scrollbar-hide">
        <section className="w-max space-x-3 pb-2 ">
          {CATEGORIES.map((el, i) => {
            return (
              <span key={el} onClick={() => handleClickCategory(i)}>
                <button type="button" className={`category-btn ${categoryId === i && 'bg-main-red text-white'}`}>
                  {el}
                </button>
              </span>
            );
          })}
        </section>
        {status === 'loading' && <Loading />}
        {status === 'error' && <div>카테고리별 인기상품이 없습니다.</div>}
      </div>
      <div className="flex flex-col gap-2 items-center">
        {data?.pages?.map((page) => {
          return (
            <div key={crypto.randomUUID()} className="w-[96%] flex flex-col gap-2">
              {page?.items?.map((el) => (
                <div key={el.boardId}>
                  <ProductItem productDetail={el} />
                </div>
              ))}
            </div>
          );
        })}
        <div>
          <button
            type="button"
            className=""
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? <Loading /> : hasNextPage ? '더보기' : ''}
          </button>
        </div>
      </div>
      <ToList categoryId={categoryId} />
      <div ref={ref}>{''}</div>
    </div>
  );
};

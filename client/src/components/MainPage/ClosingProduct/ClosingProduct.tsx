import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ProductItemImg } from '../../_common/ProductItemImg/ProductItemImg';
import { mainPageAPI } from '../../../api/mainPageAPI';
import { Loading } from '../../_common/Loading/Loading';

export const ClosingProduct = () => {
  const { isLoading, error, data } = useQuery('closingProduct', () => mainPageAPI.getClosing(), {
    refetchOnMount: true,
  });

  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [currX, setCurrX] = useState(0);

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setCurrX(e.pageX + scrollRef.current.scrollLeft);
  };

  const handleDragEnd = () => {
    setIsDrag(false);
  };

  const handleDragMove = (e) => {
    const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
    scrollRef.current.scrollLeft = currX - e.pageX;
    if (scrollLeft === 0) setCurrX(e.pageX);
    else if (scrollWidth <= clientWidth + scrollLeft) setCurrX(e.pageX + scrollLeft);
  };

  const handleThrottleDragMove = (e) => {
    let throttled = false;
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        handleDragMove(e);
        throttled = false;
      }, 20);
    }
  };

  return (
    <div className=" w-full my-4 px-2">
      <div className="flex items-center">
        <h1 className="text-lg m-2 mr-1 font-bold">마감 임박</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div
        className="flex gap-2 overflow-x-auto scrollbar-hide w-full"
        ref={scrollRef}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onMouseMove={isDrag ? handleThrottleDragMove : null}>
        {isLoading && <Loading />}
        {error && <div>마감 임박 상품이 없습니다.</div>}
        {data?.items?.map((el) => {
          return (
            <Link key={el.boardId} to={`/detail/${el.boardId}`}>
              <div className="flex flex-col ml-2 min-w-[120px] w-[120px]">
                <ProductItemImg thumbnail={el.thumbnail} statusId={el.statusId} finishedAt={el.finishedAt} />
                <p className="text-xs line-clamp-1">{el.title}</p>
                <p className="text-base text-main-orange">{el.currentPrice.toLocaleString()} coin</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

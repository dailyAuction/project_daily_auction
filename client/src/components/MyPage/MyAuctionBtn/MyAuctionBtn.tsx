import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const MyAuctionBtn = ({ status, setStatus, fetchNextPage }) => {
  const location = useLocation().pathname;
  const page = location.includes('auctionList') ? 'auction' : 'join';

  const [buttonList] = useState(
    page === 'auction'
      ? ['진행중인 경매', '성공한 경매', '유찰된 경매']
      : ['진행중인 경매', '낙찰된 경매', '실패한 경매']
  );

  return (
    <div className="flex gap-2 py-4 w-full px-2.5">
      {buttonList.map((el, i) => {
        return (
          <button
            key={el}
            type="button"
            className={`${i === status ? 'red-btn' : 'white-btn'} transition-none text-xs font-bold cursor-pointer`}
            onClick={() => {
              setStatus(i);
              fetchNextPage();
            }}>
            {el}
          </button>
        );
      })}
    </div>
  );
};

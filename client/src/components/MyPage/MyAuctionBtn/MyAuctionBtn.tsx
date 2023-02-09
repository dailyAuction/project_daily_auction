import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const MyAuctionBtn = ({ status, setStatus }) => {
  const location = useLocation().pathname;
  const page = location.includes('auctionList') ? 'auction' : 'join';

  const [buttonList] = useState(
    page === 'auction'
      ? ['진행중인 경매', '성공한 경매', '유찰된 경매']
      : ['진행중인 경매', '낙찰된 경매', '실패한 경매']
  );

  const handlerClickBtn = (idx) => {
    setStatus(idx);
  };

  return (
    <div className="flex gap-2 py-4">
      {buttonList.map((el, i) => {
        return (
          <button
            key={el}
            type="button"
            className={`${i === status ? 'red-btn' : 'white-btn'} text-xs font-bold cursor-pointer`}
            onClick={() => handlerClickBtn(i)}>
            {el}
          </button>
        );
      })}
    </div>
  );
};

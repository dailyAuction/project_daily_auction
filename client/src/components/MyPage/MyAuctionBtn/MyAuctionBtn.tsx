import { useState } from 'react';

export const MyAuctionBtn = ({ status, setStatus }) => {
  const [buttonList] = useState(['진행중인 경매', '성공한 경매', '유찰된 경매']);

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

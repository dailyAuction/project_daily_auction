import { useState } from 'react';

type BidModalProps = {
  handleClose: () => void;
};

export const BidModal = ({ handleClose }: BidModalProps) => {
  return (
    <section className="bg-modal">
      <div className="w-96 h-96 bg-background-mobile shadow-sm rounded-md flex flex-col px-10 justify-center space-y-5">
        <article className="flex flex-col space-y-1">
          <span>현재 경매가</span>
          <span className="text-xl font-bold text-main-orange">120,000 coin</span>
        </article>
        <article>
          <input placeholder="입찰가를 입력해주세요" onChange={() => console.log('hi')} className="input" />
          <span className="text-xs text-main-red">현재 충전하신 코인이 부족합니다.</span>
        </article>
        <article className="flex self-end space-x-1 items-center">
          <span className="text-sm">현재 내 코인 : </span>
          <span className="text-bold text-main-orange">10,000 coin</span>
        </article>
        <article className="flex justify-between pt-3">
          <button type="submit" className="red-btn">
            입찰
          </button>
          <button type="submit" className="white-btn" onClick={handleClose}>
            취소
          </button>
        </article>
      </div>
    </section>
  );
};

export const BidInformation = ({ bidCount, status, startingPrice, currentPrice, myPrice }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <section className="flex w-full justify-center bg-white px-2 py-3 space-y-4 flex-col">
        <article className="flex items-center space-x-2">
          <span className="text-lg font-bold text-main-orange">{currentPrice}</span>
          <span className="text-sm">(시작가 : {startingPrice})</span>
        </article>
        <article className="flex w-full justify-between items-center">
          <span className="text-sm">입찰 횟수 : {bidCount}</span>
          {status === '진행중' && (
            <button
              type="submit"
              className="red-btn"
              onClick={() => {
                setModalOpen(true);
              }}>
              입찰
            </button>
          )}
        </article>
      </section>
      {isModalOpen && <BidModal handleClose={() => setModalOpen(false)} />}
    </>
  );
};

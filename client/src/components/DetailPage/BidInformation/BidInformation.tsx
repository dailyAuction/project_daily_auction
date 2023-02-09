import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../atoms/user';

type BidModalProps = {
  handleClose: () => void;
};

const BidModal = ({ handleClose }: BidModalProps) => {
  const [bidValue, setBidValue] = useState(0);
  const onChange = (e) => {
    setBidValue(e.target.value);
  };

  return (
    <section className="bg-modal">
      <div className="modal-container">
        <article className="flex flex-col space-y-1">
          <span>현재 경매가</span>
          <span className="text-xl font-bold text-main-orange">120,000 coin</span>
        </article>
        <article>
          <input placeholder="입찰가를 입력해주세요" onChange={onChange} value={bidValue} className="input" />
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

export const BidInformation = ({ bidCount, statusId, startingPrice, currentPrice, myPrice, authorId, bidderId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const userInfo = useRecoilValue(userInfoAtom);

  return (
    <>
      <section className="flex w-full justify-center bg-white px-2 py-3 space-y-4 flex-col">
        <article className="flex items-center space-x-2">
          <span className="text-lg font-bold text-main-orange">{currentPrice}</span>
          <span className="text-sm">{myPrice ? `내 입찰가 : ${myPrice}` : `시작가 : ${startingPrice}`}</span>
        </article>
        <article className="flex w-full justify-between items-center">
          <span className="text-sm">입찰 횟수 : {bidCount}</span>
          {/* TODO: 로그인 여부 확인 기능 추가 */}
          {statusId === 0 && authorId !== userInfo.memberId && (
            <button
              type="submit"
              className="red-btn"
              onClick={() => {
                setModalOpen(true);
              }}>
              입찰
            </button>
          )}
          {/* TODO: 로그인 여부 확인 기능 추가/ 재등록, 삭제 API 연결 */}
          {statusId === 2 && authorId === userInfo.memberId && (
            <article className="flex items-center space-x-2">
              <button type="submit" className="red-btn">
                재등록
              </button>
              <button type="submit" className="white-btn">
                삭제
              </button>
            </article>
          )}
        </article>
      </section>
      {isModalOpen && <BidModal handleClose={() => setModalOpen(false)} />}
    </>
  );
};

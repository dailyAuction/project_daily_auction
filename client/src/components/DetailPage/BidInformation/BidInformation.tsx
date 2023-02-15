import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../atoms/user';
import { useHandleIsLogin } from '../../../hooks/useHandleIsLogin';
import { useBidInformation } from './useBidInformation';

import { productDetailAPI } from '../../../api/boardsAPI';
import { blockInvalidChar } from '../../../utils/blockInvalidChar';

type BidModalProps = {
  handleClose: () => void;
  currentPrice: string;
};

// 입찰 모달
const BidModal = ({ handleClose, currentPrice }: BidModalProps) => {
  const [bidValue, setBidValue] = useState('');
  const [validationMsg, setValidationMsg] = useState('');

  const { handleClickBid, handleChange } = useBidInformation({ bidValue, setBidValue, setValidationMsg });

  const { coin: myCoin } = useRecoilValue(userInfoAtom);

  return (
    <section className="bg-modal z-10">
      <div className="modal-container">
        <article className="flex flex-col space-y-1">
          <span>현재 경매가</span>
          <span className="text-xl font-bold text-main-orange">{currentPrice} coin</span>
        </article>
        <article>
          <input
            placeholder="입찰가를 입력해주세요"
            onChange={handleChange}
            value={bidValue}
            className="input"
            type="number"
            onKeyDown={blockInvalidChar}
          />
          <span className="text-xs text-main-red">{validationMsg}</span>
        </article>
        <article className="flex self-end space-x-1 items-center">
          <span className="text-sm">현재 내 코인 : </span>
          <span className="text-bold text-main-orange h-3">{myCoin} coin</span>
        </article>
        <article className="flex justify-between pt-3">
          <button type="submit" className="red-btn" onClick={() => handleClickBid(currentPrice)}>
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

export const BidInformation = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const { handleIsLogin } = useHandleIsLogin();
  const { handleClickRePost, handleDeleteProduct } = useBidInformation({});

  const userInfo = useRecoilValue(userInfoAtom);
  const boardId = useLocation().pathname.split('/')[2];

  const { isLoading, error, data } = useQuery(
    'productDetail',
    async () => {
      const res = await productDetailAPI.get(boardId);
      return res.data;
    },
    {
      onError: (e) => console.error(e),
    }
  );

  const { bidCount, statusId, startingPrice, currentPrice, myPrice = null, authorId } = data || {};

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생하였습니다.</div>;

  return (
    <>
      <section className="flex w-full justify-center bg-white px-2 py-3 space-y-4 flex-col">
        <article className="flex items-center space-x-2">
          <span className="text-lg font-bold text-main-orange">{currentPrice}</span>
          <span className="text-sm">{myPrice ? `내 입찰가 : ${myPrice}` : `시작가 : ${startingPrice}`}</span>
        </article>
        <article className="flex w-full justify-between items-center">
          <span className="text-sm">입찰 횟수 : {bidCount}</span>
          {statusId === 0 && authorId !== userInfo.memberId && (
            <button
              type="submit"
              className="red-btn"
              onClick={() => {
                handleIsLogin(handleOpenModal);
              }}>
              입찰
            </button>
          )}
          {statusId === 2 && authorId === userInfo.memberId && (
            <article className="flex items-center space-x-2">
              <button type="submit" className="red-btn" onClick={() => handleClickRePost(boardId)}>
                재등록
              </button>
              <button type="submit" className="white-btn" onClick={() => handleDeleteProduct(boardId)}>
                삭제
              </button>
            </article>
          )}
        </article>
      </section>
      {isModalOpen && <BidModal handleClose={() => setModalOpen(false)} currentPrice={currentPrice} />}
    </>
  );
};

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../atoms/user';
import { useHandleIsLogin } from '../../../hooks/useHandleIsLogin';
import { useBidInformation } from './useBidInformation';

import { productDetailAPI } from '../../../api/boardsAPI';
import { ProductDetailRealtimeResp } from '../../../types/product.type';
import { BidModal } from './BidModal';

type BidInformationProps = {
  reatTimeData: ProductDetailRealtimeResp;
  sendBid: (price: string) => void;
};

export const BidInformation = ({ reatTimeData, sendBid }: BidInformationProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const { handleIsLogin } = useHandleIsLogin();
  const { handleClickRePost, handleDeleteProduct } = useBidInformation();

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

  // 일반 경매 정보 데이터
  const { statusId, startingPrice, myPrice = null, authorId } = data || {};

  // 실시간 경매 정보 데이터
  const { price: currentPrice, bidCount } = reatTimeData;

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
      {isModalOpen && (
        <BidModal handleClose={() => setModalOpen(false)} currentPrice={currentPrice} sendBid={sendBid} />
      )}
    </>
  );
};

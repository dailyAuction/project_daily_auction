import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../atoms/user';
import { useHandleIsLogin } from '../../../hooks/useHandleIsLogin';
import { useBidInformation } from './useBidInformation';
import { ProductDetailRealtimeResp } from '../../../types/product.type';
import { BidModal } from './BidModal';
import { useGetProductDetail } from '../../../hooks/useGetProductDetail';

type BidInformationProps = {
  reatTimeData: Partial<ProductDetailRealtimeResp>;
  sendBid: (price: number) => void;
};

export const BidInformation = ({ reatTimeData, sendBid }: BidInformationProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const boardId = useLocation().pathname.split('/')[2];

  const { handleIsLogin } = useHandleIsLogin();
  const { handleClickRePost, handleDeleteProduct } = useBidInformation();
  const { memberId } = useRecoilValue(userInfoAtom);
  const { data, isLoading, error } = useGetProductDetail(boardId);

  // 일반 경매 정보 데이터
  const { statusId, startingPrice, myPrice, authorId, bidderId } = data || {};

  // 실시간 경매 정보 데이터
  const { currentPrice, bidCount } = reatTimeData;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생하였습니다.</div>;

  return (
    <>
      <section className="flex w-full justify-center bg-white px-2 py-3 space-y-4 flex-col">
        <article className="flex items-center space-x-2">
          <span className="text-lg font-bold text-main-orange">{currentPrice?.toLocaleString()} coin</span>
          <span className="text-sm">
            {myPrice ? `내 입찰가 : ${myPrice.toLocaleString()}` : `시작가 : ${startingPrice.toLocaleString()}`}
          </span>
        </article>
        <article className="flex w-full justify-between items-center">
          <span className="text-sm">입찰 횟수 : {bidCount}</span>

          {/* 진행중, 내 경매 아이템 X, 이미 입찰한 아이템 X */}
          {statusId === 1 && authorId !== memberId && bidderId !== memberId && (
            <button
              type="submit"
              className="red-btn"
              onClick={() => {
                handleIsLogin(handleOpenModal);
              }}>
              입찰
            </button>
          )}

          {/* 종료, 내가 등록한 아이템 */}
          {statusId === 3 && authorId === memberId && (
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

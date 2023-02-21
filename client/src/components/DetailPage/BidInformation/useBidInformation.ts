import React, { SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { productDetailAPI } from '../../../api/boardsAPI';
import { userInfoAtom } from '../../../atoms/user';

type UseBidInformationModalFactor = {
  bidValue?: string;
  setBidValue?: React.Dispatch<SetStateAction<string>>;
  setValidationMsg?: React.Dispatch<SetStateAction<string>>;
};

export const useBidInformationModal = ({ bidValue, setBidValue, setValidationMsg }: UseBidInformationModalFactor) => {
  const { coin: myCoin } = useRecoilValue(userInfoAtom);

  // bidValue 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setBidValue(target.value);

    // 맨 앞자리가 0인 경우, target.value 도 0이면 입력을 방지한다.
    if (+bidValue === 0 && +target.value === 0) {
      setBidValue('');
    }
  };

  // 구매자가 입찰시 사용되는 핸들러
  const handleClickBid = (currentPrice: number, sendBid: (price: string) => void) => {
    // 현재 가진 코인보다 입력한 코인이 더 많을 경우
    if (+bidValue > +myCoin) {
      setValidationMsg('보유한 코인이 부족합니다.');
    }
    // 현재 경매가보다 입력한 코인이 더 적은 경우
    else if (+bidValue < +currentPrice) {
      setValidationMsg('현재 경매가보다 높은 가격을 입력해주세요.');
    }
    // 모든 조건을 통과한 경우
    else {
      // TODO: 입찰 요청 로직 작성
      setValidationMsg('딱 적당하네요~');
      // useWebsocket으로 부터 온 sendBid 함수로 웹소켓을 통한 send
      sendBid(String(currentPrice));
    }
  };

  return { handleClickBid, handleChange };
};

export const useBidInformation = () => {
  const navigate = useNavigate();

  // 판매자가 재등록 및 삭제할 때 사용되는 핸들러
  const handleClickRePost = (boardId: string) => {
    // boardId로 재등록 요청된 게시글 데이터를 조회할 수 있음.
    navigate(`/postProduct?${boardId}`);
  };
  const handleDeleteProduct = async (boardId: string) => {
    try {
      if (
        // eslint-disable-next-line
        confirm('정말 삭제하시겠습니까?')
      ) {
        await productDetailAPI.delete(boardId);
        navigate('/categoryProduct/0');
      }
    } catch (err) {
      throw new Error('요청에 실패하였습니다.' + err.message);
    }
  };

  return { handleClickRePost, handleDeleteProduct };
};

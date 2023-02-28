import { SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../atoms/user';

type UseBidInfoModalFactor = {
  bidValue?: string;
  setBidValue?: React.Dispatch<SetStateAction<string>>;
  setValidationMsg?: React.Dispatch<SetStateAction<string>>;
};

export const useBidInfoModal = ({ bidValue, setBidValue, setValidationMsg }: UseBidInfoModalFactor) => {
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
  const handleClickBid = (currentPrice: number, sendBid: (price: number) => void) => {
    // 현재 가진 코인보다 입력한 코인이 더 많을 경우
    if (+bidValue > +myCoin) {
      setValidationMsg('보유한 코인이 부족합니다.');
    }
    // 현재 경매가보다 입력한 코인이 더 적은 경우
    else if (+bidValue <= +currentPrice) {
      setValidationMsg('현재 경매가보다 높은 가격을 입력해주세요.');
    }
    // 모든 조건을 통과한 경우
    else {
      // eslint-disable-next-line no-restricted-globals, no-alert, no-lonely-if
      if (confirm('입찰 하시겠습니까?')) {
        setValidationMsg('입찰하였습니다!');
        // useWebsocket으로 부터 온 sendBid 함수로 웹소켓을 통한 send
        sendBid(+bidValue);
      }
    }
  };

  return { handleClickBid, handleChange };
};

import { SetStateAction } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { myInfoAPI } from '../../../api/myPageAPI';
import { accessTokenAtom } from '../../../atoms/token';
import { userInfoAtom } from '../../../atoms/user';
import { useCoinCalc } from '../../../hooks/useCoinCalc';

type UseBidInfoModalFactor = {
  bidValue: string;
  setBidValue: React.Dispatch<SetStateAction<string>>;
  setValidationMsg: React.Dispatch<SetStateAction<string>>;
  handleClose: () => void;
};

export const useBidInfoModal = ({ bidValue, setBidValue, setValidationMsg, handleClose }: UseBidInfoModalFactor) => {
  const [{ coin: myCoin }, setCoin] = useRecoilState(userInfoAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  // 코인 잔액 업데이트 핸들러
  const handleUpdateCoin = async () => {
    try {
      const { coin } = await myInfoAPI.get(accessToken);
      setCoin((prev) => ({ ...prev, coin }));
    } catch (err) {
      console.error(err);
    }
  };

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
  const handleClickBid = async (currentPrice: number, sendBid: (price: number) => void) => {
    if (+bidValue > +myCoin) {
      setValidationMsg('보유한 코인이 부족합니다.');
    } else if (+bidValue <= +currentPrice) {
      setValidationMsg('현재 경매가보다 높은 가격을 입력해주세요.');
    } else {
      const bidValuePer1000 = useCoinCalc(bidValue);
      setBidValue(String(bidValuePer1000));

      // eslint-disable-next-line no-restricted-globals, no-alert, no-lonely-if
      if (confirm(`${bidValuePer1000}coin으로 입찰 하시겠습니까?`)) {
        setValidationMsg('입찰하였습니다!');

        // 웹소켓을 통한 send
        sendBid(bidValuePer1000);
        setBidValue('');
        // await로 코인이 업데이트 될 때까지 대기
        // 입찰을 완료한 후 곧바로 코인을 업데이트!
        await handleUpdateCoin();
        // 입찰 완료 후 모달 닫기
        handleClose();
      }
    }
  };

  return { handleClickBid, handleChange };
};

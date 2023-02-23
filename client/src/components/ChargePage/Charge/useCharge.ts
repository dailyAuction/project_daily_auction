import { useRecoilState, useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import React, { SetStateAction } from 'react';
import { accessTokenAtom } from '../../../atoms/token';
import { userInfoAtom } from '../../../atoms/user';
import { useCoinCalc, useBtnCoinCalc } from '../../../hooks/useCoinCalc';
import { coinAPI } from '../../../api/coinAPI';

type UseChargeFactor = {
  coinValue?: string;
  setCoinValue?: React.Dispatch<SetStateAction<string>>;
  setModalOpen?: React.Dispatch<SetStateAction<boolean>>;
  setAdviceText?: React.Dispatch<SetStateAction<boolean>>;
};

export const useCharge = ({ coinValue, setCoinValue, setModalOpen, setAdviceText }: UseChargeFactor) => {
  const [, setUserInfo] = useRecoilState(userInfoAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  const { mutate: patchCoin } = useMutation(
    (calcCoin: number) => {
      return coinAPI.patchCoinCharge({ coin: calcCoin, token: accessToken });
    },
    {
      onSuccess: (res) => {
        setUserInfo((prev) => ({ ...prev, coin: String(res) }));
        setModalOpen(true);
      },
      onError: (error) => {
        console.log('충전 실패 : ', error);
      },
    }
  );

  const handleChargeCoin = () => {
    setCoinValue(String(useCoinCalc(coinValue)));
    if (Number(coinValue) >= 1000) {
      setAdviceText(false);
      patchCoin(useCoinCalc(coinValue));
    } else {
      setAdviceText(true);
    }
  };

  const handleClickCoin = (coin: number) => {
    setCoinValue(useBtnCoinCalc(coinValue, coin));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCoinValue(target.value);
  };

  return { handleChange, handleClickCoin, handleChargeCoin };
};

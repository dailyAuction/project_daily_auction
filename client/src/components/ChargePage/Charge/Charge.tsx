import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../atoms/user';
import { CHARGECOIN_STATUS } from '../../../constants/constants';
import { blockInvalidChar } from '../../../utils/blockInvalidChar';
import { CheckModal } from '../ChargeModal/CheckModal';
import { useCharge } from './useCharge';

export const Charge = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAdviceText, setAdviceText] = useState(false);
  const [coinValue, setCoinValue] = useState('');
  const { coin: myCoin } = useRecoilValue(userInfoAtom);
  const { handleChange, handleClickCoin, handleChargeCoin } = useCharge({
    coinValue,
    setCoinValue,
    setModalOpen,
    setAdviceText,
  });

  return (
    <main className="w-full flex flex-col mt-5 items-center">
      <section className=" w-full p-[10px] space-y-6 bg-white">
        <article className="flex flex-col">
          <span className="text-base">내 코인</span>
          <span className="text-2xl text-main-orange font-bold">{Number(myCoin).toLocaleString()} coin</span>
        </article>
        <article>
          <span className="text-base">충전 금액</span>
          <div className="flex flex-row relative mt-2">
            <input
              type="number"
              onChange={(e) => handleChange(e)}
              onKeyDown={blockInvalidChar}
              value={coinValue}
              className="input bg-background-mobile"
              placeholder="10,000"
            />
            <span className="absolute right-4 top-1">원</span>
          </div>
          {isAdviceText && <p className="flex items-center text-main-red">1000원 이상 충전하여야 합니다.</p>}
        </article>
        <article className="flex justify-center space-x-2">
          {CHARGECOIN_STATUS.map((item) => (
            <button type="button" key={item} className="white-btn" onClick={() => handleClickCoin(item)}>
              {item.toLocaleString()} 원
            </button>
          ))}
        </article>
        <article className="w-full flex justify-between">
          <span className="flex justify-center items-center text-main-red">1,000원 단위로 입력해 주세요.</span>
          <button type="button" onClick={handleChargeCoin} className="red-btn p-3 text-sm font-bold">
            충전하기
          </button>
        </article>
      </section>
      {isModalOpen && <CheckModal handleClose={() => setModalOpen(false)} />}
    </main>
  );
};

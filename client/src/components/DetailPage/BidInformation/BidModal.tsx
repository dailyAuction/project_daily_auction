import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../atoms/user';
import { blockInvalidChar } from '../../../utils/blockInvalidChar';
import { useBidInformationModal } from './useBidInformation';

type BidModalProps = {
  currentPrice: number;
  sendBid: (price: number) => void;
  handleClose: () => void;
};

// 입찰 모달
export const BidModal = ({ handleClose, currentPrice, sendBid }: BidModalProps) => {
  const [bidValue, setBidValue] = useState('');
  const [validationMsg, setValidationMsg] = useState('');

  const { handleClickBid, handleChange } = useBidInformationModal({ bidValue, setBidValue, setValidationMsg });

  const { coin: myCoin } = useRecoilValue(userInfoAtom);

  return (
    <section className="bg-modal z-10">
      <div className="modal-container">
        <article className="flex flex-col space-y-1">
          <span>현재 경매가</span>
          <span className="text-xl font-bold text-main-orange">{currentPrice?.toLocaleString()} coin</span>
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
        <article className="self-end">
          <span className="text-sm">현재 내 코인 : </span>
          <span className="text-bold text-main-orange h-3">{Number(myCoin).toLocaleString()} coin</span>
        </article>
        <article className="flex justify-between pt-3">
          <button type="submit" className="red-btn" onClick={() => handleClickBid(currentPrice, sendBid)}>
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

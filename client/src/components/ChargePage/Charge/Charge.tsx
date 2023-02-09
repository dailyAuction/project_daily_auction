import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHARGECOIN_STATUS } from '../../../constants/constants';

type CheckModalProps = {
  handleClose: () => void;
};

const CheckModal = ({ handleClose }: CheckModalProps) => {
  const navigate = useNavigate();

  return (
    <section className="bg-modal">
      <div className="modal-container justify-around items-center py-5">
        <span className="text-lg font-bold">예치금 충전 완료</span>
        <article className="flex flex-col items-center text-base">
          <span>예치금이 정상적으로 충전되었습니다.</span>
          <span>현재 예치금 : </span>
        </article>
        <article>
          <span className="text-2xl text-main-orange font-bold">10,000 coin</span>
        </article>
        <article className="w-full flex justify-around font-bold">
          <button
            type="button"
            className="red-btn"
            onClick={() => {
              handleClose();
              navigate(-1);
            }}>
            확인
          </button>
        </article>
      </div>
    </section>
  );
};

export const Charge = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main className="w-full flex flex-col mt-5 items-center">
      <section className=" w-full p-[10px] space-y-6 bg-white">
        <article className="flex flex-col">
          <span className="text-base">내 코인</span>
          {/* TODO : 현재 가지고 있는 코인으로 변경 */}
          <span className="text-2xl text-main-orange font-bold">10,000 coin</span>
        </article>
        <article>
          <span className="text-base">충전 금액</span>
          <div className="flex flex-row relative mt-2">
            <input type="number" pattern="[0-9]+" className="input bg-background-mobile" placeholder="10,000" />
            <span className="absolute right-4 top-1">원</span>
          </div>
        </article>
        {/* TODO : 비밀번호 재확인 */}
        <article className="flex justify-center space-x-2">
          {CHARGECOIN_STATUS.map((item) => (
            <button type="button" key={item} className="white-btn">
              {item}
            </button>
          ))}
        </article>
        <article className="w-full flex justify-between">
          <span className="flex justify-center items-center text-main-red">1,000원 단위로 입력해 주세요.</span>
          <button type="button" onClick={() => setModalOpen(true)} className="red-btn p-3 text-sm font-bold">
            충전하기
          </button>
        </article>
      </section>
      {isModalOpen ? <CheckModal handleClose={() => setModalOpen(false)} /> : <></>}
    </main>
  );
};

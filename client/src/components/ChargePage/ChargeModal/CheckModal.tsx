import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../atoms/user';

type CheckModalProps = {
  handleClose: () => void;
};

export const CheckModal = ({ handleClose }: CheckModalProps) => {
  const navigate = useNavigate();
  const { coin: myCoin } = useRecoilValue(userInfoAtom);

  return (
    <section className="bg-modal">
      <div className="modal-container justify-around items-center py-5">
        <span className="text-lg font-bold">예치금 충전 완료</span>
        <article className="flex flex-col items-center text-base">
          <span>예치금이 정상적으로 충전되었습니다.</span>
          <span>현재 예치금 : </span>
        </article>
        <article>
          <span className="text-2xl text-main-orange font-bold">{Number(myCoin).toLocaleString()} coin</span>
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

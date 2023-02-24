import { Link } from 'react-router-dom';

type CheckModalProps = {
  handleClose: () => void;
};

export const CheckModal = ({ handleClose }: CheckModalProps) => {
  return (
    <section className="bg-modal">
      <div className="modal-container justify-around items-center py-5">
        <span className="text-lg font-bold">비밀번호 변경 완료</span>
        <article className="flex flex-col items-center text-base">
          <span>입력하신 비밀번호로 변경되었습니다.</span>
        </article>
        <article className="w-full flex justify-around font-bold">
          <Link to="/my">
            <button type="button" className="red-btn" onClick={handleClose}>
              확인
            </button>
          </Link>
        </article>
      </div>
    </section>
  );
};

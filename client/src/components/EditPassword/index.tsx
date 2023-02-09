import { useState } from 'react';
import { Link } from 'react-router-dom';

type CheckModalProps = {
  handleClose: () => void;
};

const CheckModal = ({ handleClose }: CheckModalProps) => {
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

export const EditPassword = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main className="w-full flex flex-col mt-5 items-center">
      <section className=" w-full p-[10px] bg-white">
        <form className="space-y-4">
          {/* TODO : 현재 비밀번호 체크 - 버튼 누를시 */}
          <article>
            <span>현재 비밀번호</span>
            <input type="password" className="input bg-background-mobile" placeholder="********" />
          </article>
          {/* TODO : 비밀번호 유효성 검사 */}
          <article>
            <span>변경할 비밀번호</span>
            <input type="password" className="input bg-background-mobile" placeholder="********" />
          </article>
          {/* TODO : 비밀번호 재확인 */}
          <article>
            <span>변경할 비밀번호 확인</span>
            <input type="password" className="input bg-background-mobile" placeholder="********" />
          </article>
          <article className="w-full flex justify-center p-5">
            <button type="button" onClick={() => setModalOpen(true)} className="red-btn p-3 text-sm font-bold">
              비밀번호 변경하기
            </button>
          </article>
        </form>
        {isModalOpen ? <CheckModal handleClose={() => setModalOpen(false)} /> : <></>}
      </section>
    </main>
  );
};

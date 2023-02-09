import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginStateAtom } from '../../../atoms/user';

type LeaveModalProps = {
  handleClose: () => void;
};

const LeaveModal = ({ handleClose }: LeaveModalProps) => {
  return (
    <section className="bg-modal">
      <div className="modal-container justify-around items-center py-5">
        <span className="text-lg font-bold">회원탈퇴</span>
        <article className="flex flex-col items-center text-base">
          <p>남은 예치금은 탈퇴시 소멸됩니다.</p>
          <p>
            정말 <span className="text-main-red font-bold">탈퇴</span>하시겠습니까?
          </p>
        </article>
        <article className="w-full flex justify-around font-bold">
          <button type="submit" className="white-btn">
            예
          </button>
          <button type="submit" className="red-btn" onClick={handleClose}>
            아니오
          </button>
        </article>
      </div>
    </section>
  );
};

export const MyPageInfo = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [, setLoginState] = useRecoilState(loginStateAtom);

  const myAuctionBtn = 'w-full bg-background-mobile p-6';

  return (
    <main className="w-full flex flex-col items-center space-y-5 text-main-brown">
      <section className="w-full bg-white px-[10px] py-3 mt-5">
        <article className="flex flex-row h-full justify-between items-center">
          <div className="font-medium text-sm ">
            <span>현재 로그인 : </span>
            <span className="font-bold">email@gmail.com</span>
          </div>
          {/* TODO : 비밀번호 변경 페이지로 LINK */}
          <Link to="/editPassword">
            <span className="text-xs font-light">비밀번호 변경 &gt;</span>
          </Link>
        </article>
      </section>
      <section className="w-full px-[10px] py-3 bg-white">
        <span className="text-base font-bold">내 코인</span>
        <article className="flex flex-row justify-between my-2">
          {/* TODO : 데이터에 따라 코인 수 변경 */}
          <span className="text-xl font-bold text-main-orange">10,000 coin</span>
          {/* TODO : 모달 추가하기 */}
          <Link to="/charge">
            <button type={'button'} className="red-btn text-sm font-bold">
              충전하기
            </button>
          </Link>
        </article>
        <article className="w-full flex flex-row mt-4">
          {/* TODO : 각 페이지로 링크 작업 */}
          <button className={`${myAuctionBtn} border-r-2 border-light-gray`} type="button">
            내가 등록한 경매
          </button>
          <button className={myAuctionBtn} type="button">
            내가 참여한 경매
          </button>
        </article>
      </section>
      <section className="w-full px-[10px] py-3 bg-white">
        {/* TODO : 모달 추가하기 */}
        <button type="button" onClick={() => setLoginState(false)}>
          로그아웃
        </button>
      </section>
      <section className="w-full px-[10px] py-3 bg-white">
        {/* TODO : 모달 추가하기 */}
        <button
          type="button"
          onClick={() => {
            setModalOpen(true);
          }}>
          회원 탈퇴
        </button>
        {isModalOpen ? <LeaveModal handleClose={() => setModalOpen(false)} /> : <></>}
      </section>
    </main>
  );
};

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { socialLoginStateAtom, userInfoAtom } from '../../../atoms/user';
import { resetUserInfoHook } from '../../../hooks/useResetUserInfo';
import { SignOutModal } from './SignOutModal';

export const MyPageInfo = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { email, coin } = useRecoilValue(userInfoAtom);
  const socialLoginState = useRecoilValue(socialLoginStateAtom);
  const { resetUser } = resetUserInfoHook();

  const handleLogout = () => {
    resetUser();
    navigate('/');
  };

  const myAuctionBtn = 'w-full bg-background-mobile p-6';

  return (
    <main className="w-full flex flex-col items-center space-y-5 text-main-brown">
      <section className="w-full bg-white px-[10px] py-3 mt-5">
        <article className="flex flex-row h-full justify-between items-center">
          <div className="font-medium text-sm ">
            <span>현재 로그인 : </span>
            <span className="font-bold">{email}</span>
          </div>
          {socialLoginState ? (
            <></>
          ) : (
            <Link to="/editPassword">
              <span className="text-xs font-light">비밀번호 변경 &gt;</span>
            </Link>
          )}
        </article>
      </section>
      <section className="w-full px-[10px] py-3 bg-white">
        <span className="text-base font-bold">내 코인</span>
        <article className="flex flex-row justify-between my-2">
          <span className="text-xl font-bold text-main-orange">{Number(coin).toLocaleString()} coin</span>
          <Link to="/charge">
            <button type={'button'} className="red-btn text-sm font-bold">
              충전하기
            </button>
          </Link>
        </article>
        <article className="w-full flex flex-row mt-4">
          <button className={`${myAuctionBtn} border-r-2 border-light-gray`} type="button">
            <Link to="/my/auctionList">내가 등록한 경매</Link>
          </button>
          <button className={myAuctionBtn} type="button">
            <Link to="/my/joinList">내가 참여한 경매</Link>
          </button>
        </article>
      </section>
      <section className="w-full px-[10px] py-3 bg-white">
        {/* TODO : 모달 추가하기 */}
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
      </section>
      <section className="w-full px-[10px] py-3 bg-white">
        <button
          type="button"
          onClick={() => {
            setModalOpen(true);
          }}>
          회원 탈퇴
        </button>
        {isModalOpen ? <SignOutModal handleClose={() => setModalOpen(false)} /> : <></>}
      </section>
    </main>
  );
};

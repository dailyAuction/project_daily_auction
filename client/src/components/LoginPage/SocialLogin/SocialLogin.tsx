import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { myInfoAPI } from '../../../api/myPageAPI';
import { loginStateAtom, socialLoginStateAtom, userInfoAtom } from '../../../atoms/user';
import { MainHeader } from '../../_common/Header/MainHeader/MainHeader';
import { TabBar } from '../../_common/TabBar/TabBar';
import { useSocialToken } from './useSocialLogin';

export const SocialLogin = () => {
  const navigate = useNavigate();
  const [, setUserInfo] = useRecoilState(userInfoAtom);
  const [, setLoginState] = useRecoilState(loginStateAtom);
  const [, setSocialLoginState] = useRecoilState(socialLoginStateAtom);
  // TODO : 로딩 페이지와 소셜 로그인 실패 페이지 구성

  const { access, refresh } = useSocialToken();
  const socialLogin = async () => {
    try {
      const res = await myInfoAPI.get();
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      // setAccessToken(access);
      // setRefreshToken(refresh);
      setUserInfo({
        memberId: res.memberId,
        coin: res.coin,
        email: res.email.split(']')[1],
      });
      setLoginState(true);
      setSocialLoginState(true);
      navigate('/');
    } catch (error) {
      console.log('소셜 로그인 실패 : ', error);
    }
  };

  useEffect(() => {
    if (access !== refresh) {
      socialLogin();
    } else {
      console.log('엑세스 토큰과 리프레시 토큰이 동일합니다.');
    }
  }, []);
  return (
    <main className="base-layout bg-white relative">
      <MainHeader>Daily Auction</MainHeader>
      <div className="fixed bottom-0 sm:w-[500px] w-screen">
        <TabBar />
      </div>
    </main>
  );
};

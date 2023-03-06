import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginStateAtom } from '../atoms/user';

export const useHandleIsLogin = () => {
  const loginState = useRecoilValue(loginStateAtom);
  const navigate = useNavigate();

  // 로그인이 되어 있는 경우에 실행시키고 싶은 함수를 콜백으로 전달할 수 있습니다.
  const handleIsLogin = (callback?: () => void) => {
    if (!loginState) {
      // eslint-disable-next-line
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } else {
      // eslint-disable-next-line
      if (callback) {
        callback();
      }
    }
  };

  return { handleIsLogin };
};

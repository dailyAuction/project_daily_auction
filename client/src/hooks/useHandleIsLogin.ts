import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginStateAtom } from '../atoms/user';

export const useHandleIsLogin = () => {
  const loginState = useRecoilValue(loginStateAtom);
  const navigate = useNavigate();

  const handleIsLogin = (callback?: () => void) => {
    if (!loginState) {
      // eslint-disable-next-line
      if (confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?')) navigate('/login');
    } else {
      // eslint-disable-next-line
      if (callback) {
        callback();
      }
    }
  };

  return { handleIsLogin };
};

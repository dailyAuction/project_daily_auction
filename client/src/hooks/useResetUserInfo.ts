import { useResetRecoilState } from 'recoil';
import { loginStateAtom, userInfoAtom, socialLoginStateAtom } from '../atoms/user';
// import { refreshTokenAtom, accessTokenAtom } from '../atoms/token';

export const resetUserInfoHook = () => {
  // const resetAccessToken = useResetRecoilState(accessTokenAtom);
  // const resetRefreshToken = useResetRecoilState(refreshTokenAtom);
  // const resetUserInfo = useResetRecoilState(userInfoAtom);
  // const resetLoginState = useResetRecoilState(loginStateAtom);
  // const resetSocialLoginState = useResetRecoilState(socialLoginStateAtom);

  const resetUser = () => {
    localStorage.clear();
    // resetAccessToken();
    // resetRefreshToken();
    // resetUserInfo();
    // resetLoginState();
    // resetSocialLoginState();
  };

  return { resetUser };
};

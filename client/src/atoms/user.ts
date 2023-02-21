import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

// const [loginState, setLoginState] = useRecoilState(loginStateAtom);
export const loginStateAtom = atom({
  key: 'loginState',
  default: true,
});

// const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
export const userInfoAtom = atom({
  key: 'userInfo',
  default: {
    memberId: 1,
    coin: '1000000',
    email: 'test@test.com',
  },
  effects: [localStorageEffect('userinfo')],
});

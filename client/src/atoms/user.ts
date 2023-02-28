import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

// const [loginState, setLoginState] = useRecoilState(loginStateAtom);
export const loginStateAtom = atom({
  key: 'loginState',
  default: false,
  effects: [localStorageEffect('loginState')],
});

// const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
export const userInfoAtom = atom({
  key: 'userInfo',
  default: {
    memberId: 1,
    coin: 0,
    email: 'test@test.com',
  },
  effects: [localStorageEffect('userInfo')],
});

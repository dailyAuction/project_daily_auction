import { atom } from 'recoil';

// const [loginState, setLoginState] = useRecoilState(loginStateAtom);
export const loginStateAtom = atom({
  key: 'loginState',
  default: true,
});

// const [userInfo, setUserInfo] = useRecoilState(loginStateAtom);
export const userInfoAtom = atom({
  key: 'userInfo',
  default: {
    memberId: 1,
    coin: '1000000',
    email: 'test@test.com',
  },
});

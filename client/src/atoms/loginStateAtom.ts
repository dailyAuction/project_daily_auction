import { atom } from 'recoil';

// const [loginState, setLoginState] = useRecoilState(loginStateAtom);
export const loginStateAtom = atom({
  key: 'loginState',
  default: false,
});

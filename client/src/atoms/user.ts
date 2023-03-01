import { atom } from 'recoil';
import { MemberInfo } from '../types/member.type';
import { localStorageEffect } from './localStorageEffect';

// const [loginState, setLoginState] = useRecoilState(loginStateAtom);
export const loginStateAtom = atom<boolean>({
  key: 'loginState',
  default: false,
  effects: [localStorageEffect('loginState')],
});

// const [socialLoginState, setSocialLoginState] = useRecoilState(socialLoginState);
export const socialLoginStateAtom = atom<boolean>({
  key: 'socialLoginState',
  default: false,
  effects: [localStorageEffect('SocialLoginState')],
});

// const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
export const userInfoAtom = atom<MemberInfo>({
  key: 'userInfo',
  default: {
    memberId: 1,
    coin: 0,
    email: 'test@test.com',
  },
  effects: [localStorageEffect('userInfo')],
});

import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

// const [accessToken, setAccessToken]= useRecoilState(accessTokenAtom);
export const accessTokenAtom = atom({
  key: 'accessToken',
  default: '',
  effects: [localStorageEffect('access')],
});

// const [refreshToken, setRefreshToken]= useRecoilState(refreshTokenAtom);
export const refreshTokenAtom = atom({
  key: 'refreshToken',
  default: '',
  effects: [localStorageEffect('refresh')],
});

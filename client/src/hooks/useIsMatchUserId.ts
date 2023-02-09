import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../atoms/user';

export const useIsMatchUserId = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const isMatchUserId = (id: number) => {
    return id === userInfo.memberId;
  };

  return { isMatchUserId };
};

import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { noticesAPI } from '../api/noticesAPI';
import { accessTokenAtom } from '../atoms/token';
import { loginStateAtom } from '../atoms/user';
import { NOTIFICATION_KEY } from '../constants/constants';

export const useNotification = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const loginState = useRecoilValue(loginStateAtom);

  if (loginState) {
    // 알림 데이터 가져오기
    const { data: notifications, refetch } = useQuery(NOTIFICATION_KEY, () => noticesAPI.get(accessToken), {
      refetchOnMount: true,
      onError: (e) => console.error(e),
    });

    // 삭제 후 데이터 업데이트
    const { mutate: handleDelete, isLoading: isDeleteLoading } = useMutation(
      (noticeId: number) => {
        return noticesAPI.delete(noticeId, accessToken);
      },
      {
        onSuccess: () => {
          refetch();
        },
        onError: () => {
          throw new Error('삭제 실패!');
        },
      }
    );

    return { notifications, handleDelete, isDeleteLoading };
  }

  const notifications = [];
  return { notifications };
};

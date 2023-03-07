import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { noticesAPI } from '../api/noticesAPI';
import { loginStateAtom } from '../atoms/user';
import { NOTIFICATION_KEY } from '../constants/constants';

export const useNotification = () => {
  const loginState = useRecoilValue(loginStateAtom);

  if (loginState) {
    // 알림 데이터 가져오기
    const {
      data: notifications,
      isLoading,
      error,
      refetch,
    } = useQuery(NOTIFICATION_KEY, () => noticesAPI.get(), {
      refetchOnMount: true,
      onError: (e) => console.error(e),
    });

    // 삭제 후 데이터 업데이트
    const { mutate: handleDelete } = useMutation(
      (noticeId: number) => {
        return noticesAPI.delete(noticeId);
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

    return { notifications, isLoading, error, handleDelete };
  }

  const notifications = [];
  return { notifications };
};

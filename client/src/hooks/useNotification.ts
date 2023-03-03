import { useQueryClient } from 'react-query';
import { NOTIFICATION_KEY } from '../constants/constants';
import { NotificationResp } from '../types/notice.type';

export const useNotification = () => {
  const queryClient = useQueryClient();
  const notifications = queryClient.getQueryData(NOTIFICATION_KEY) as NotificationResp[];

  const handleDelete = (noticeId: number) => {
    // TODO: 알림 삭제기능 구현하기
  };

  return { notifications, handleDelete };
};

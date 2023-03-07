import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { Notification } from '../components/NotificationPage/Notification/Notification';
import { useNotification } from '../hooks/useNotification';

export const NotificationPage = () => {
  const { notifications } = useNotification();
  return (
    <main className="base-layout">
      <SubHeader>알림</SubHeader>
      <section className="content-layout">
        {notifications &&
          notifications.map((noti) => (
            <Notification
              noticeId={noti.noticeId}
              boardId={noti.boardId}
              boardTitle={noti.boardTitle}
              thumbnail={noti.thumbnail}
              statusId={noti.statusId}
              contact={noti.contact}
              key={noti.noticeId}
            />
          ))}
      </section>
      <TabBar />
    </main>
  );
};

import { useEffect } from 'react';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { Notification } from '../components/NotificationPage/Notification/Notification';
import { notificationResp } from '../mock/notificationResp';

export const NotificationPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>알림</SubHeader>
      <section className="content-layout">
        {notificationResp.items.map((noti) => (
          <Notification
            noticeId={noti.noticeId}
            boardId={noti.boardId}
            boardTitle={noti.boardTitle}
            image={noti.image}
            status={noti.status}
            contact={noti.contact}
            key={noti.noticeId}
          />
        ))}
      </section>
      <TabBar />
    </main>
  );
};

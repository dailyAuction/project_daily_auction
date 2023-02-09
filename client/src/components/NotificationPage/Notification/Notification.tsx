import { Link } from 'react-router-dom';
import { NOTIFICATION_STATUS, NOTIFICATION_STATUS_MSG } from '../../../constants/constants';
import { getShortString } from '../../../utils/getShortString';
import { useNotification } from './useNotification';

type NotificationProps = {
  noticeId: number;
  boardId: number;
  boardTitle: string;
  image: string;
  status: number;
  contact?: string;
};

export const Notification = ({ noticeId, boardId, boardTitle, image, status, contact }: NotificationProps) => {
  const { handleDelete } = useNotification();
  return (
    <section className="bg-white mt-2 py-2 px-3 rounded-lg space-y-3">
      <article className="flex justify-between items-center border-b pt-2 pb-1">
        <span>{NOTIFICATION_STATUS[status]} 알림</span>
        <i onClick={() => handleDelete(noticeId)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </i>
      </article>
      <Link to={`/detail/${boardId}`} className="flex flex-col space-y-2">
        <article>
          <h1 className="text-lg font-bold">
            {!status ? contact + NOTIFICATION_STATUS_MSG[status] : NOTIFICATION_STATUS_MSG[status]}
          </h1>
          {!status && <span className="text-sm">* 위 이메일로 연락해주세요.</span>}
        </article>

        <article className="flex items-center space-x-2 relative">
          <img src={image} alt="상품 썸네일 이미지" className="w-10 h-10 rounded-md" />

          <span className="text-sm">{getShortString(boardTitle, 20)}</span>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 absolute right-0 bottom-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </i>
        </article>
      </Link>
    </section>
  );
};

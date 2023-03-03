import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useCallback, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../atoms/token';
import { NOTIFICATION_KEY } from '../constants/constants';
import { NotificationResp } from '../types/notice.type';

export const useSSE = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const eventSource = useRef<EventSourcePolyfill | EventSource>();
  const queryClient = useQueryClient();

  // sse 연결 함수
  const fetchSSE = useCallback(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;

    // 새로운 EventSource 연결
    eventSource.current = new EventSource(`${process.env.REACT_APP_URL}/subscribe`, {
      headers: {
        Authorization: accessToken,
      },
      heartbeatTimeout: 30000,
    });

    // 메시지 수신시 캐시에 저장
    eventSource.current.onmessage = (event) => {
      queryClient.setQueryData(NOTIFICATION_KEY, (prevData: NotificationResp[] | null) => {
        if (event.data[0] === 'E') console.log(event.data);

        const eventData = event.data[0] === '{' ? JSON.parse(event.data) : null;
        const newData = prevData ? [...prevData, eventData] : [eventData];

        return eventData ? newData : prevData;
      });
    };

    eventSource.current.onerror = (event) => {
      // console.error(event);
    };
  }, []);

  // 조건에 따라 sse 연결 함수를 실행하도록 fetchSSE 그리고 eventSource 객체를 리턴합니다.
  return { fetchSSE, eventSource };
};

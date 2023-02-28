import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../atoms/token';

export const useSSE = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const eventSource = useRef<EventSourcePolyfill | EventSource>();

  // sse 연결 함수
  const fetchSSE = useCallback(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;

    eventSource.current = new EventSource(`${process.env.REACT_APP_URL}/subscribe`, {
      headers: {
        Authorization: accessToken,
      },
      heartbeatTimeout: 30000,
    });

    eventSource.current.onmessage = (event) => {
      console.log(event.data);
    };

    eventSource.current.onerror = (event) => {
      console.error(event);
    };
  }, [accessToken]);

  // TODO: SSE 알림 수신시 알림 데이터 저장

  // 조건에 따라 sse 연결 함수를 실행하도록 fetchSSE 그리고 eventSource 객체를 리턴합니다.
  return { fetchSSE, eventSource };
};

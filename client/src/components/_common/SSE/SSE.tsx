import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginStateAtom } from '../../../atoms/user';
import { useSSE } from '../../../hooks/useSSE';

export const SSE = () => {
  const loginState = useRecoilValue(loginStateAtom);
  const { fetchSSE, eventSource } = useSSE();

  // FIXME: 가끔 알림이 씹히는 경우 수정하기. 연결 불안정? 연결 오류?
  // 로그인시 SSE 연결
  useEffect(() => {
    if (loginState) {
      fetchSSE();
      // TODO: 첫 마운트시 API 요청하여 쿼리 데이터 동기화
      // TODO: 새로고침, 창 닫았다가 다시 열었을 때 쿼리 데이터 동기화
    }

    return () => eventSource.current?.close();
  }, [eventSource, loginState]);

  return <></>;
};

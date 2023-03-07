import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginStateAtom } from '../../../atoms/user';
import { useSSE } from '../../../hooks/useSSE';

export const SSE = () => {
  const loginState = useRecoilValue(loginStateAtom);
  const { fetchSSE, eventSource } = useSSE();

  // 로그인시 SSE 연결
  useEffect(() => {
    if (loginState) {
      fetchSSE();
    }

    return () => eventSource.current?.close();
  }, [eventSource, loginState]);

  return <></>;
};

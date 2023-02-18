import { useEffect, useRef } from 'react';

// shoudContinue 는 setInterval의 종료시점을 의미합니다.
export const useInterval = (callback: () => void, delay: number, shouldContinue?: boolean) => {
  // ref 는 함수가 재실행되어도 값을 기억하는 객체입니다.
  const savedCallback = useRef<() => void | null>();

  // 콜백함수를 ref 에 저장합니다.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (shouldContinue) {
      const id = setInterval(() => {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }, delay);

      return () => clearInterval(id);
    }

    return () => {
      savedCallback.current = null;
    };
  }, [delay, shouldContinue]);
};

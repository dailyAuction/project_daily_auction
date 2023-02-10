import { useEffect, useRef } from 'react';

// shoudContinue 는 setInterval의 종료시점을 의미합니다.
export const useInterval = (callback: () => void, delay: number, shouldContinue?: boolean) => {
  // ref 는 함수가 재실행되어도 값을 기억하는 객체입니다.
  const savedCallback = useRef<() => void>();

  // 콜백함수를 ref 에 저장합니다.
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (shouldContinue) {
      const tick = () => {
        // 콜백함수가 있는 경우 이를 실행하는 함수입니다.
        if (savedCallback.current) {
          savedCallback.current();
        }
      };

      // 매 delay마다 interval을 실행합니다.
      // useEffect 훅이 종료되면 인터벌을 종료합니다.
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    // eslint-disable-next-line
    else return () => null;
  }, [delay]);
};

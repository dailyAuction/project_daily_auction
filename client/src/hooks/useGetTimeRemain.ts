import { useEffect, useState } from 'react';
import { useInterval } from './useInterval';

export const useGetTimeRemain = (finishedAt: string) => {
  const [realTime, setRealTime] = useState(new Date());
  const [timeRemain, setTimeRemain] = useState('00 : 00 : 00');
  const [shoudContinue, setShouldContinue] = useState(true);
  const finishTime = new Date(finishedAt);
  const timeDiff = +finishTime - +realTime;

  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  // 현재 시간을 1초마다 업데이트
  // 업데이트된 시간을 바탕으로 시,분,초 업데이트
  useInterval(
    () => {
      setRealTime(new Date());
      setTimeRemain(
        `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
      );
    },
    1000,
    shoudContinue
  );

  useEffect(() => {
    if (timeDiff <= 0) setShouldContinue(false);
  }, [realTime]);

  return { timeRemain };
};

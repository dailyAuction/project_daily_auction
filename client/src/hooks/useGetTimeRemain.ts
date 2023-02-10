import { useState } from 'react';
import { useInterval } from './useInterval';

export const useGetTimeRemain = (finishedAt: string) => {
  const [realTime, setRealTime] = useState(new Date());
  const [timeRemain, setTimeRemain] = useState('');
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
      setTimeRemain(`${hours} : ${minutes} : ${seconds}`);
    },
    1000,
    timeDiff >= 0
  );

  return { timeRemain };
};

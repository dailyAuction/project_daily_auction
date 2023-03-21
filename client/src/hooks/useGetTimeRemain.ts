import { useLayoutEffect, useState } from 'react';
import { useInterval } from './useInterval';

export const useGetTimeRemain = (finishedAt: string) => {
  // 남은 시간 문자열을 리턴하는 상태
  const [timeRemain, setTimeRemain] = useState('00 : 00 : 00');
  // 인터벌 함수의 실행 여부를 판단하는 상태
  const [shouldContinue, setShouldContinue] = useState(true);

  const updateTime = () => {
    // 종료시간 객체화
    const finishTime = new Date(finishedAt);
    // 시간 얼마나 차이나는지
    const timeDiff = +finishTime - +new Date();

    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    // 계산한 값을 상태값에 저장해준다.
    setTimeRemain(
      `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
    );

    // 남은 시간이 없는 경우
    if (timeDiff <= 0) {
      setShouldContinue(false);
      return setTimeRemain('00 : 00 : 00');
    }
  };

  // 시간을 반복해서 업데이트 하는 훅 실행
  // shouldContinue가 true일 때에만 첫 번째 인자인 콜백함수를 실행시킨다.
  useInterval(updateTime, 1000, shouldContinue);

  // 첫 렌더링에서 보여줄 시간을 계산한다.
  useLayoutEffect(() => {
    updateTime();
    setShouldContinue(true);

    return () => {
      setShouldContinue(false);
      setTimeRemain('00 : 00 : 00');
    };
    // 첫 마운트 + finishedAt 값이 변경될 때만 위 함수가 실행
    // finishedAt 값을 넘겨주지 않으면 이전 렌더링의 결과값에서 새로 렌더링을 해주기까지
    // 꽤 시간이 차이가 납니다.
  }, [finishedAt]);

  return { timeRemain };
};

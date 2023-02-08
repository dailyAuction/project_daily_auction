import React, { SetStateAction } from 'react';

export type Increment = -1 | 1;

export const useClickCarousel = (setIdx: React.Dispatch<SetStateAction<number>>, curIdx: number, totalLen: number) => {
  const moveCarouosel = (calc: Increment) => {
    const newIdx = curIdx + calc;
    if (newIdx > -1 && newIdx < totalLen) {
      setIdx(newIdx);
    }
  };

  return { moveCarouosel };
};

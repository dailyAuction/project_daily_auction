export type Increment = -1 | 1;

export const useClickCarousel = <T extends Increment>(
  setIdx: (idx: number) => void,
  curIdx: number,
  totalLen: number
) => {
  const moveCarouosel = (calc: T) => {
    const newIdx = curIdx + calc;
    if (newIdx > -1 && newIdx < totalLen) {
      setIdx(newIdx);
    }
  };

  return { moveCarouosel };
};

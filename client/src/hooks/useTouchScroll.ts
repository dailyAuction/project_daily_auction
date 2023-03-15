import { useRef, useState } from 'react';

export const useTouchScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [currX, setCurrX] = useState(0);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setCurrX(e.pageX + scrollRef.current.scrollLeft);
    const currTarget = e.target as HTMLDivElement;
    currTarget.style.cursor = 'pointer';
  };

  const handleDragEnd = () => {
    setIsDrag(false);
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
    scrollRef.current.scrollLeft = currX - e.pageX;
    if (scrollLeft === 0) setCurrX(e.pageX);
    else if (scrollWidth <= clientWidth + scrollLeft) setCurrX(e.pageX + scrollLeft);
  };

  const handleThrottleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    let throttled = false;
    if (!throttled && isDrag) {
      throttled = true;
      setTimeout(() => {
        handleDragMove(e);
        throttled = false;
      }, 20);
    }
    if (isDrag) {
      const currTarget = e.target as HTMLDivElement;
      currTarget.style.cursor = 'grab';
    }
  };

  return { scrollRef, handleDragStart, handleDragEnd, handleThrottleDragMove };
};

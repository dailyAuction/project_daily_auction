import { useRef, useState } from 'react';

export const useTouchScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [currX, setCurrX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setCurrX(e.pageX + scrollRef.current.scrollLeft);
    setStartX(e.pageX);
  };

  const handleDragEnd = (e) => {
    setIsDrag(false);
    setEndX(e.pageX);
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
  };

  return { scrollRef, startX, endX, handleDragStart, handleDragEnd, handleThrottleDragMove };
};

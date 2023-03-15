import { useRef, useState } from 'react';

export const useTouchScroll = () => {
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [currX, setCurrX] = useState(0);
  const [stopClick, setStopClick] = useState(false);

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStopClick(false);
    setCurrX(e.pageX + scrollRef.current.scrollLeft);
  };

  const handleDragEnd = () => {
    setIsDrag(false);
  };

  const handleDragMove = (e) => {
    const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
    scrollRef.current.scrollLeft = currX - e.pageX;
    if (scrollLeft === 0) setCurrX(e.pageX);
    else if (scrollWidth <= clientWidth + scrollLeft) setCurrX(e.pageX + scrollLeft);
  };

  const handleThrottleDragMove = (e) => {
    setStopClick(true);
    let throttled = false;
    if (!throttled && isDrag) {
      throttled = true;
      setTimeout(() => {
        handleDragMove(e);
        throttled = false;
      }, 20);
    }
  };

  return { stopClick, scrollRef, handleDragStart, handleDragEnd, handleThrottleDragMove };
};

import { useState, useRef, useEffect } from 'react';

export const Banner = () => {
  const [currSlide, setCurrSlide] = useState(0);
  const slideRef = useRef(null);

  const TOTAL_SLIDES = 2;

  const handlerClickPrevBtn = () => {
    if (currSlide === 0) setCurrSlide(TOTAL_SLIDES);
    else setCurrSlide(currSlide - 1);
  };

  const handlerClickNextBtn = () => {
    if (currSlide >= TOTAL_SLIDES) setCurrSlide(0);
    else setCurrSlide(currSlide + 1);
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currSlide}00%)`;
  }, [currSlide]);

  return (
    <div className="base-layout relative overflow-hidden">
      <div className="h-40 flex" ref={slideRef}>
        <img className="duration-700 ease-in-out" src="/testImg/test1.jpeg" alt="1" />
        <img className="duration-700 ease-in-out" src="/testImg/test2.jpg" alt="2" />
      </div>
      <div>
        <button type="button" className="absolute top-16 left-3" onClick={handlerClickPrevBtn}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/40 hover:bg-white/60 ">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-white dark:text-gray-800"
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7">
                {''}
              </path>
            </svg>
          </span>
        </button>
        <button type="button" className="absolute top-16 right-3" onClick={handlerClickNextBtn}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/40 hover:bg-white/60 ">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-white dark:text-gray-800"
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7">
                {''}
              </path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

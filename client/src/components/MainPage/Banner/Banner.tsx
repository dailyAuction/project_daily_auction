import { useState, useRef } from 'react';

export const Banner = () => {
  const [currSlide, setCurrSlide] = useState(0);
  const slideRef = useRef(null);

  // 배너에 들어갈 이미지 개수
  const TOTAL_SLIDES = 3;

  const handlerClickPrevBtn = () => {
    if (currSlide <= 0) setCurrSlide(0);
    else setCurrSlide(currSlide - 1);
  };

  const handlerClickNextBtn = () => {
    if (currSlide >= TOTAL_SLIDES - 1) setCurrSlide(0);
    else setCurrSlide(currSlide + 1);
  };

  return (
    <div className="base-layout my-2">
      <div className="relative">
        <div className="w-full h-56 flex justify-center items-center bg-[#F2ECC8]" ref={slideRef}>
          <img
            className="w-screen object-fill max-h-56"
            src={`https://daily-auction-bucket.s3.ap-northeast-2.amazonaws.com/banner/banner${currSlide + 1}.jpg`}
            alt=""
          />
        </div>
        <div>
          <button type="button" className="absolute top-20 left-3" onClick={handlerClickPrevBtn}>
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
          <button type="button" className="absolute top-20 right-3" onClick={handlerClickNextBtn}>
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
    </div>
  );
};

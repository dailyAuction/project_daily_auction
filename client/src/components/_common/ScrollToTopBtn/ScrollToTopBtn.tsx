import { useEffect, useState } from 'react';

export const ScrollToTopBtn = () => {
  const [showBtn, setShowBtn] = useState(false);

  const handlerMoveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowbtn = () => {
      if (window.scrollY > 50) setShowBtn(true);
      else setShowBtn(false);
    };
    window.addEventListener('scroll', handleShowbtn);
    return () => {
      window.removeEventListener('scroll', handleShowbtn);
    };
  }, []);

  return (
    <div className="sticky w-12 ml-auto mr-1 bottom-24">
      {showBtn && (
        <div
          className="flex justify-center items-center w-10 h-10 bg-background-mobile rounded-full cursor-pointer border border-[#ababab] hover:opacity-80 z-[1000] "
          onClick={handlerMoveToTop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="black"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </div>
      )}
    </div>
  );
};

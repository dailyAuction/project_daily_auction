export const ScrollToTopBtn = () => {
  const handlerMoveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="fixed top-[530px] right-5 flex justify-center items-center w-10 h-10 bg-background-mobile rounded-full cursor-pointer border border-[#ababab] hover:opacity-80 z-1000 "
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
  );
};

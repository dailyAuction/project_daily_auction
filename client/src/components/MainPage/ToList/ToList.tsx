export const ToList = () => {
  return (
    <div className="base-layout my-4">
      <div className="flex flex-row justify-center gap-2 cursor-pointer hover:opacity-80">
        <div className="text-base">목록으로 이동</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </div>
  );
};

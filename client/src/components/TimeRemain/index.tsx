export const TimeRemain = ({ children }) => {
  const oneHourLeft = children.slice(0, 2) === '00';

  return (
    <button
      type="button"
      className={`rounded-[10px] px-2.5 shadow-lg w-[70px] h-[18px] opacity-40 text-xs ${
        oneHourLeft ? 'bg-[E4E4E4] text-main-red' : 'bg-black text-white'
      } `}>
      {children}
    </button>
  );
};

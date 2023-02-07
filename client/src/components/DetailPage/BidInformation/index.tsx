export const BidInformation = ({ bidCount, status, startingPrice, currentPrice, myPrice }) => {
  return (
    <section className="flex w-full justify-center bg-white px-2 py-3 space-y-4 flex-col">
      <article className="flex items-center space-x-2">
        <span className="text-lg font-bold text-main-orange">{currentPrice}</span>
        <span className="text-sm">(시작가 : {startingPrice})</span>
      </article>
      <article className="flex w-full justify-between items-center">
        <span className="text-sm">입찰 횟수 : {bidCount}</span>
        {status === '진행중' && (
          <button type="submit" className="red-btn">
            입찰
          </button>
        )}
      </article>
    </section>
  );
};

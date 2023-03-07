import { ProductStatus } from '../../_common/ProductStatus/ProductStatus';
import { useGetTimeRemain } from '../../../hooks/useGetTimeRemain';
import { useAuctionStatus } from './useAuctionStatus';

export const AuctionStatus = () => {
  const { finishedAt, checkStatus } = useAuctionStatus();
  // 종료 시간을 전달하면, 현재 시간으로 남은 시간을 시:분:초 형태의 string으로 리턴
  const { timeRemain } = useGetTimeRemain(finishedAt);

  return (
    <section className="flex h-9 w-full justify-between items-center px-2 bg-white">
      <article className="space-x-2">
        <span>남은 시간</span>
        <span className="text-main-orange">{timeRemain}</span>
      </article>

      <ProductStatus>{checkStatus()}</ProductStatus>
    </section>
  );
};

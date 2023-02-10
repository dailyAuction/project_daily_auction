import { ProductStatus } from '../../_common/ProductStatus/ProductStatus';
import { AUCTION_STATUS } from '../../../constants/constants';
import { useGetTimeRemain } from '../../../hooks/useGetTimeRemain';

type AuctionStatusProps = {
  finishedAt: string;
  statusId: number;
};

export const AuctionStatus = ({ finishedAt, statusId }: AuctionStatusProps) => {
  // 종료 시간을 전달하면, 현재 시간으로 남은 시간을 시:분:초 형태의 string으로 리턴
  const { timeRemain } = useGetTimeRemain(finishedAt);

  return (
    <section className="flex h-9 w-full justify-between items-center px-2 bg-white">
      <article className="space-x-2">
        <span>남은 시간</span>
        <span className="text-main-orange">{timeRemain}</span>
      </article>
      {/* TODO: 로그인 여부, 판매자 / 입찰자 여부 판단하여 조건부 렌더링 */}
      <ProductStatus>{AUCTION_STATUS[statusId]}</ProductStatus>
    </section>
  );
};

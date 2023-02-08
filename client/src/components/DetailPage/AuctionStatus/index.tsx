import { ProductStatus } from '../../ProductStatus';
import { AUCTION_STATUS } from '../../../constants/constants';

type AuctionStatusProps = {
  finishedAt: string;
  status: number;
};

export const AuctionStatus = ({ finishedAt, status }: AuctionStatusProps) => {
  return (
    <section className="flex h-9 w-full justify-between items-center px-2 bg-white">
      <article className="space-x-2">
        <span>남은 시간</span>
        {/* TODO: 남은 시간 카운트하는 함수 만들어서 적용 */}
        <span className="text-main-orange">{finishedAt}</span>
      </article>
      {/* TODO: 로그인 여부, 판매자 / 입찰자 여부 판단하여 조건부 렌더링 */}
      <ProductStatus>{AUCTION_STATUS[status]}</ProductStatus>
    </section>
  );
};

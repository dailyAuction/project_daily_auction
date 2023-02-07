import { ProductStatus } from '../../ProductStatus';

type AuctionStatusProps = {
  finishedAt: string;
  status: string;
};

export const AuctionStatus = ({ finishedAt, status }: AuctionStatusProps) => {
  return (
    <section className="flex h-9 w-full justify-between items-center px-2 bg-white">
      <article className="space-x-2">
        <span>남은 시간</span>
        <span className="text-main-orange">{finishedAt}</span>
      </article>
      <ProductStatus>{status}</ProductStatus>
    </section>
  );
};

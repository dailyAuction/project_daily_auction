import { Link, useLocation } from 'react-router-dom';
import { AUCTION_STATUS } from '../../../constants/constants';
import { useIsMatchUserId } from '../../../hooks/useIsMatchUserId';
import { ProductDetailResp } from '../../../types/product.type';
import { getShortString } from '../../../utils/getShortString';
import { ProductItemImg } from '../ProductItemImg/ProductItemImg';
import { ProductStatus } from '../ProductStatus/ProductStatus';

type ProductItemProps = {
  productDetail: ProductDetailResp;
};

export const ProductItem = ({ productDetail }: ProductItemProps) => {
  const { boardId, thumbnail, title, statusId, startingPrice, currentPrice, finishedAt } = productDetail;

  // 현재 유저가 Seller 인지 판단합니다.
  // const { isMatchUserId } = useIsMatchUserId();
  // const isUserSeller = isMatchUserId(authorId);

  const location = useLocation().pathname;
  const page = location.includes('auctionList') ? 'register' : location.includes('joinList') ? 'participation' : '';

  return (
    <Link to={`/detail/${boardId}`}>
      <div className="flex justify-center items-end relative w-full rounded-[10px] bg-background-mobile cursor-pointer">
        <div className="p-[6px] flex-2">
          <ProductItemImg thumbnail={thumbnail} statusId={statusId} finishedAt={finishedAt} />
        </div>
        <div className="flex-1 px-0.5">
          {statusId === 2 && page === 'participation' && (
            <div className="text-xs font-bold py-2">
              <p>판매자 이메일</p>
              <p>:aaaa@aaaa.com</p>
            </div>
          )}
          <p className="text-sm sm:text-base font-bold line-clamp-2">{getShortString(title, 40)}</p>
          <div className="pb-2 pt-3 text-xs">
            {statusId !== 1 ? '' : page === 'register' ? `시작가 ${startingPrice} coin` : `입찰가 ${currentPrice} coin`}
            <div className="flex items-center gap-0.5">
              {statusId === 1 ? '현재가' : ''}
              <p className="text-base text-main-orange">{currentPrice}</p>
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <ProductStatus>{AUCTION_STATUS[statusId - 1]}</ProductStatus>
          </div>
        </div>
      </div>
    </Link>
  );
};

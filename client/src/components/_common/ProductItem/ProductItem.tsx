import { useLocation } from 'react-router-dom';
import { ProductItemImg } from '../ProductItemImg/ProductItemImg';
import { ProductStatus } from '../ProductStatus/ProductStatus';

type ProductItemProps = {
  isLoginUser: boolean;
  status: number;
};

export const ProductItem = ({ isLoginUser, status }: ProductItemProps) => {
  const location = useLocation().pathname;
  const page = location.includes('my-auction-list')
    ? 'register'
    : location.includes('participation-list')
    ? 'participation'
    : '';

  return (
    <div className="flex justify-center items-end relative w-full rounded-[10px] bg-background-mobile">
      <div className="p-[6px] flex-2">
        <ProductItemImg />
      </div>
      <div className="flex-1 px-0.5">
        {status === 1 && (
          <div className="text-xs font-bold py-2">
            <p>판매자 이메일</p>
            <p>:aaaa@aaaa.com</p>
          </div>
        )}
        <p className="text-xs line-clamp-2">
          엄청난 야구모자를 파는 경매를 진행 하고 있는 이 경매는 정말 엄 ...엄청난 야구모자를 파는 경매를 진행 하고있는
          엄청난 야구모자를 파는 경매를 진행 하고 있는 이 경매는 정말 엄 ...엄청난 야구모자를 파는 경매를 진행 하고
        </p>
        <div className="pb-2 pt-3 text-xs">
          {isLoginUser && status !== 0 ? '' : page === 'register' ? '시작가 10000 coin' : '입찰가 10000 coin'}
          <div className="flex items-center gap-0.5">
            {isLoginUser && status === 0 ? '현재가' : ''}
            <p className="text-base text-main-orange">150,000 coin</p>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <ProductStatus>{status === 0 ? status : ''}</ProductStatus>
        </div>
      </div>
    </div>
  );
};

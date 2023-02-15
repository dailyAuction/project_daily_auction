import { useLocation } from 'react-router-dom';
import { TimeRemain } from '../TimeRemain/TemiRemain';

type ProductImgProps = {
  thumbnail: string;
  statusId: number;
};

export const ProductItemImg = ({ thumbnail, statusId }: ProductImgProps) => {
  const location = useLocation().pathname.split('/')[2];
  const myBidWin = statusId === 1 && location === 'joinList';

  return (
    <div className="relative">
      <img
        className={`${myBidWin ? 'opacity-60' : ''} w-[120px] h-[120px] rounded-[10px] object-cover`}
        src={thumbnail}
        alt="상품 썸네일 이미지"
      />
      {myBidWin && <div className="absolute top-10 left-10 text-red-600 text-lg">낙찰!</div>}
      <div className="absolute bottom-[95px] left-[5px]">
        {/* TODO: 남은 시간 계산하는 함수 만들어서 값 전달하기 */}
        <TimeRemain>00:23:23</TimeRemain>
      </div>
    </div>
  );
};

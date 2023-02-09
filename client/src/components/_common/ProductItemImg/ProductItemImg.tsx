import { TimeRemain } from '../TimeRemain/TemiRemain';

type ProductImgProps = {
  thumbnail: string;
};

export const ProductItemImg = ({ thumbnail }: ProductImgProps) => {
  return (
    <div className="relative">
      <img className="w-[120px] h-[120px] rounded-[10px] object-cover" src={thumbnail} alt="상품 썸네일 이미지" />
      <div className="absolute bottom-[95px] left-[5px]">
        {/* TODO: 남은 시간 계산하는 함수 만들어서 값 전달하기 */}
        <TimeRemain>00:23:23</TimeRemain>
      </div>
    </div>
  );
};

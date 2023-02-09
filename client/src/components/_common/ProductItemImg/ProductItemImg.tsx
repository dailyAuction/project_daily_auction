import { TimeRemain } from '../TimeRemain/TemiRemain';

export const ProductItemImg = () => {
  return (
    <div className="relative">
      <img className="w-[120px] h-[120px] rounded-[10px]" src="./test.jpeg" alt="testImage" />
      <div className="absolute bottom-[95px] left-[5px]">
        <TimeRemain>00:23:23</TimeRemain>
      </div>
    </div>
  );
};

import { CategoryBtn } from '../components/CategoryBtn';
import { ProductStatus } from '../components/ProductStatus';
import { Temp } from '../components/temp/Temp';

export const TempPage = () => {
  return (
    <main className="base-layout">
      <Temp />
      <ProductStatus>유찰</ProductStatus>
      <CategoryBtn>전체ㅁㄴㅇㄹㅁㄴㄹㄴㄹ</CategoryBtn>
    </main>
  );
};

import { CategoryDropdown } from '../components/RegisterProductPage/CategoryDropdown/CategoryDropdown';
import { RegisterItemImg } from '../components/RegisterProductPage/RegisterItemImg/RegisterItemImg';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { RegisterProductInfo } from '../components/RegisterProductPage/RegisterProductInfo/RegisterProductInfo';
import { TabBar } from '../components/_common/TabBar/TabBar';

export const RegisterProductPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>상품 등록</SubHeader>
      <RegisterItemImg />
      <CategoryDropdown />
      <RegisterProductInfo />
      <button type="submit" className="red-btn m-2 ml-auto mb-3">
        등록
      </button>
      <TabBar />
    </main>
  );
};

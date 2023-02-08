import { CategoryDropdown } from '../components/RegisterProductPage/CategoryDropdown';
import { RegisterItemImg } from '../components/RegisterProductPage/RegisterItemImg';
import { SubHeader } from '../components/Header/SubHeader/index';
import { RegisterProductInfo } from '../components/RegisterProductPage/RegisterProductInfo';
import { TabBar } from '../components/TabBar';

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

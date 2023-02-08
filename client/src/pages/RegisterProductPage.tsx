import { CategoryDropdown } from '../components/RegisterProductPage/CategoryDropdown';
import { RegisterItemImg } from '../components/RegisterProductPage/RegisterItemImg';
import { SubHeader } from '../components/Header/SubHeader/index';

export const RegisterProductPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>상품 등록</SubHeader>
      <RegisterItemImg />
      <CategoryDropdown />
    </main>
  );
};

import { useState, useRef, useCallback } from 'react';
import { CategoryDropdown } from '../components/PostProductPage/CategoryDropdown/CategoryDropdown';
import { RegisterItemImg } from '../components/PostProductPage/RegisterItemImg/RegisterItemImg';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { RegisterProductInfo } from '../components/PostProductPage/RegisterProductInfo/RegisterProductInfo';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { RegisterBtn } from '../components/PostProductPage/RegisterBtn/RegisterBtn';

export const PostProductPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handlerModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const ab = () => {};

  return (
    <main className="base-layout">
      <div className="base-layout" onClick={() => modalOpen && handlerModal()}>
        <SubHeader>상품 등록</SubHeader>
        <RegisterItemImg />
        <CategoryDropdown />
        <RegisterProductInfo />

        <RegisterBtn modalOpen={modalOpen} handlerModal={handlerModal} />
      </div>

      <TabBar />
    </main>
  );
};

import { useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { CategoryDropdown } from '../components/PostProductPage/CategoryDropdown/CategoryDropdown';
import { RegisterItemImg } from '../components/PostProductPage/RegisterItemImg/RegisterItemImg';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { RegisterProductInfo } from '../components/PostProductPage/RegisterProductInfo/RegisterProductInfo';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { RegisterBtn } from '../components/PostProductPage/RegisterBtn/RegisterBtn';
import { postProductAPI } from '../api/postProductAPI';

export const PostProductPage = () => {
  const [myImage, setMyImage] = useState([]);
  const [productInfo, setProductInfo] = useState({
    title: '',
    startingPrice: 0,
    description: '',
    category: '',
  });

  const formData = new FormData();
  Array.from(myImage).forEach((img) => formData.append('files', img));
  formData.append('data', JSON.stringify(productInfo));

  const { mutate } = useMutation(() => {
    return postProductAPI.post(formData);
  });

  const handleSubmit = (e, data) => {
    e.preventDefault();
    mutate(data, {
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('error');
      },
    });
    // Array.from(formData.entries()).forEach((el) => console.log(el));
  };

  return (
    <main className="base-layout">
      <form className="base-layout" onSubmit={(e) => handleSubmit(e, mutate)}>
        <SubHeader>상품 등록</SubHeader>
        <RegisterItemImg myImage={myImage} setMyImage={setMyImage} />
        <CategoryDropdown productInfo={productInfo} setProductInfo={setProductInfo} />
        <RegisterProductInfo productInfo={productInfo} setProductInfo={setProductInfo} />
        <RegisterBtn />
      </form>
      <TabBar />
    </main>
  );
};

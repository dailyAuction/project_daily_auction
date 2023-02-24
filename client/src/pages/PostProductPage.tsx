import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { CategoryDropdown } from '../components/PostProductPage/CategoryDropdown/CategoryDropdown';
import { RegisterItemImg } from '../components/PostProductPage/RegisterItemImg/RegisterItemImg';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { RegisterProductInfo } from '../components/PostProductPage/RegisterProductInfo/RegisterProductInfo';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { RegisterBtn } from '../components/PostProductPage/RegisterBtn/RegisterBtn';
import { postProductAPI } from '../api/postProductAPI';
import { accessTokenAtom } from '../atoms/token';

export const PostProductPage = () => {
  const [myImage, setMyImage] = useState([]);
  const [productInfo, setProductInfo] = useState({
    title: '',
    startingPrice: 0,
    description: '',
    category: '',
  });
  const [token] = useRecoilState(accessTokenAtom);
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const formData = new FormData();
  Array.from(myImage).forEach((img) => formData.append('files', img));
  formData.append('data', new Blob([JSON.stringify(productInfo)], { type: 'application/json' }));

  const { mutate } = useMutation(() => postProductAPI.post(formData, token));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, data) => {
    e.preventDefault();
    if (myImage.length <= 0) {
      setErrMessage('이미지를 등록해주세요');
      setModalOpen(false);
    } else if (Object.values(productInfo).filter((val) => val).length < 4) {
      setErrMessage('내용을 전부 입력해주세요');
      setModalOpen(false);
    } else {
      mutate(data, {
        onSuccess: (res) => navigate(`/detail/${res.boardId}`),
        onError: () => {
          setErrMessage('잠시후 다시 시도해주세요');
          setModalOpen(false);
        },
      });
    }
  };

  return (
    <main className="base-layout">
      <form className="base-layout" onSubmit={(e) => handleSubmit(e, mutate)}>
        <SubHeader>상품 등록</SubHeader>
        <RegisterItemImg myImage={myImage} setMyImage={setMyImage} />
        <CategoryDropdown productInfo={productInfo} setProductInfo={setProductInfo} />
        <RegisterProductInfo productInfo={productInfo} setProductInfo={setProductInfo} />
        <p className="h-0 text-sm text-main-red">{errMessage}</p>
        <RegisterBtn modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </form>
      <TabBar />
    </main>
  );
};

import { useRecoilValue } from 'recoil';
import { useCallback, useState } from 'react';
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
    categoryId: '',
  });
  const token = useRecoilValue(accessTokenAtom);
  const [valid, setValid] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();

  const formData = new FormData();
  Array.from(myImage).forEach((img) => formData.append('files', img));
  formData.append('data', new Blob([JSON.stringify(productInfo)], { type: 'application/json' }));

  const { mutate } = useMutation(() => postProductAPI.post(formData, token));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, data) => {
    e.preventDefault();
    mutate(data, {
      onSuccess: (res) => navigate(`/detail/${res.boardId}`),
      onError: () => {
        setErrMessage('잠시후 다시 시도해주세요');
        setValid(false);
      },
    });
  };

  const handleClickBtn = useCallback(() => {
    if (myImage.length <= 0) setErrMessage('이미지를 등록해주세요');
    else if (Object.values(productInfo).filter((val) => val).length < 4) setErrMessage('내용을 전부 입력해주세요');
    else {
      setValid(true);
      setErrMessage('');
    }
  }, [myImage, productInfo]);

  return (
    <main className="base-layout">
      <form className="base-layout" onSubmit={(e) => handleSubmit(e, mutate)}>
        <SubHeader>상품 등록</SubHeader>
        <RegisterItemImg myImage={myImage} setMyImage={setMyImage} />
        <CategoryDropdown productInfo={productInfo} setProductInfo={setProductInfo} />
        <RegisterProductInfo productInfo={productInfo} setProductInfo={setProductInfo} />
        <p className="h-0 text-sm text-main-red">{errMessage}</p>
        <RegisterBtn valid={valid} setValid={setValid} handleClickBtn={handleClickBtn} />
      </form>
      <TabBar />
    </main>
  );
};

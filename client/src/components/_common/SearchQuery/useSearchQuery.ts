import { useNavigate } from 'react-router-dom';

export const useSearchQuery = () => {
  const navigate = useNavigate();
  const handleSearch = (categoryId: number, keyWord: string) => {
    // categoryId와 keyWord를 파라미터를 통해 검색 결과 페이지로 전달
    // 검색 결과 페이지에서 파라미터를 추출해 직접 요청한다.
    navigate(`/search/${categoryId}_${keyWord}`);
  };

  return { handleSearch };
};

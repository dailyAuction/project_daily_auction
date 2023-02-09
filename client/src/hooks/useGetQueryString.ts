import { useLocation } from 'react-router-dom';

// 검색 결과 추출을 위해 사용합니다.
// ex) /search/categoryId_keyWord => categoryId_keyWord
export const useGetQueryString = () => {
  const params = useLocation().pathname.slice(8);
  const queryString = decodeURIComponent(params);

  return queryString;
};

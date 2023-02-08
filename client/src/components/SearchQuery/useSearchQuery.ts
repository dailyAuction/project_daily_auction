export const useSearchQuery = () => {
  const handleSearch = (categoryId, keyWord) => {
    const url = `/${categoryId}/search/?page=1&size=10`;
    // TODO: API post 요청 보내는 로직 작성
    // keyword 는 request body로 보낸다.
    // search 후 검색 결과를 토대로 검색 결과 리스트로 이동필요
    console.log(url, keyWord);
  };

  return { handleSearch };
};

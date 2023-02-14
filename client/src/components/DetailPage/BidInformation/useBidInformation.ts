import { useNavigate } from 'react-router-dom';

export const useBidInformation = () => {
  const navigate = useNavigate();
  const handleClickRePost = (boardId: string) => {
    // boardId로 재등록 요청된 게시글 데이터를 조회할 수 있음.
    navigate(`/postProduct?${boardId}`);
  };
  const handleDeleteProduct = (boardId: string) => {
    // TODO: 삭제 API 연결
  };

  return { handleClickRePost, handleDeleteProduct };
};

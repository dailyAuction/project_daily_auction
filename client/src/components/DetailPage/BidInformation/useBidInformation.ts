import { useNavigate } from 'react-router-dom';
import { productDetailAPI } from '../../../api/boardsAPI';

export const useBidInformation = () => {
  const navigate = useNavigate();

  // 판매자가 재등록 및 삭제할 때 사용되는 핸들러
  const handleClickRePost = (boardId: string) => {
    // boardId로 재등록 요청된 게시글 데이터를 조회할 수 있음.
    navigate(`/postProduct?${boardId}`);
  };
  const handleDeleteProduct = async (boardId: string) => {
    try {
      if (
        // eslint-disable-next-line
        confirm('정말 삭제하시겠습니까?')
      ) {
        await productDetailAPI.delete(boardId);
        navigate('/categoryProduct/0');
      }
    } catch (err) {
      throw new Error('요청에 실패하였습니다.' + err.message);
    }
  };

  return { handleClickRePost, handleDeleteProduct };
};

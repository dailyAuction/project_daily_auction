import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../../atoms/user';
import { useGetProductDetail } from '../../../hooks/useGetProductDetail';

export const useAuctionStatus = () => {
  // 게시글 데이터 요청 로직
  const boardId = useLocation().pathname.split('/')[2];

  const { data } = useGetProductDetail(boardId);
  const { finishedAt, statusId, authorId, bidderId } = data || {};
  const { memberId } = useRecoilValue(userInfoAtom);

  // 현재 상태와 유저의 입찰,판매 여부를 확인해 렌더링할 상태 메시지 리턴
  const checkStatus = () => {
    // status 가 1인 경우 => '진행'리턴
    if (statusId === 1) return '진행중';
    if (statusId === 2) {
      if (authorId === memberId) return '성공';
      return '낙찰!';
    }
    if (statusId === 3) {
      if (authorId === memberId) return '유찰';
      if (bidderId === memberId) return '실패';
      return '마감';
    }
    return null;
  };

  return { finishedAt, checkStatus };
};

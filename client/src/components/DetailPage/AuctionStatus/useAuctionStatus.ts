import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { productDetailAPI } from '../../../api/boardsAPI';
import { userInfoAtom } from '../../../atoms/user';

export const useAuctionStatus = () => {
  // 게시글 데이터 요청 로직
  const boardId = useLocation().pathname.split('/')[2];

  const { data } = useQuery(
    'productDetail',
    async () => {
      const res = await productDetailAPI.get(boardId);
      return res.data;
    },
    {
      onError: (e) => console.error(e),
      refetchOnMount: true,
    }
  );

  // data가 undefined, null인 경우 TypeError 발생, 아닐 경우에만 분해되도록 함.
  const { finishedAt, statusId, authorId, bidderId } = data || {};
  const { memberId } = useRecoilValue(userInfoAtom);

  // 현재 상태와 유저의 입찰,판매 여부를 확인해 렌더링할 상태 메시지 리턴
  const checkStatus = () => {
    // status 가 0인 경우 => '진행'리턴
    if (statusId === 0) return '진행중';
    if (statusId === 1) {
      if (authorId === memberId) return '성공';
      return '낙찰!';
    }
    if (statusId === 2) {
      if (authorId === memberId) return '유찰';
      if (bidderId === memberId) return '실패';
      return '마감';
    }
    return null;
  };

  return { finishedAt, checkStatus };
};

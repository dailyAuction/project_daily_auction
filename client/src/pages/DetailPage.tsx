import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import { CategoryBtn } from '../components/_common/CategoryBtn/CategoryBtn';
import { AuctionStatus } from '../components/DetailPage/AuctionStatus/AuctionStatus';
import { BidInformation } from '../components/DetailPage/BidInformation/BidInformation';
import { Chart } from '../components/DetailPage/Chart/Chart';
import { ImageList } from '../components/DetailPage/ImageList/ImageList';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { CATEGORIES } from '../constants/constants';
import { useWebsocket } from '../hooks/useWebsocket';
import { useGetProductDetail } from '../hooks/useGetProductDetail';

export const DetailPage = () => {
  const boardId = useLocation().pathname.split('/')[2];

  const { data, isLoading, error } = useGetProductDetail(boardId);
  const { imageUrls, categoryId, viewCount, description, title } = data || {};

  // 웹소켓 연결
  const { response, sendBid } = useWebsocket(`/sub/board-id/${boardId}`);

  // 실시간 데이터 변경시에 상품 데이터 refetch
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.refetchQueries(['productDetail', boardId]);
  }, [response]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생하였습니다.</div>;

  return (
    <main className="base-layout">
      <SubHeader>상세 페이지</SubHeader>
      <section className="content-layout">
        <ImageList url={imageUrls} />
        <h1 className="text-xl font-semibold">{title}</h1>
        <CategoryBtn>{CATEGORIES[categoryId]}</CategoryBtn>
        <article className="flex justify-between px-2">
          <span>id : {boardId}</span>
          <span>조회수 : {viewCount}</span>
        </article>

        <AuctionStatus />

        <BidInformation reatTimeData={response} sendBid={sendBid} />

        <article className="py-8 bg-white px-2">{description}</article>
        <Chart realTimeData={response} />
      </section>
      <TabBar />
    </main>
  );
};

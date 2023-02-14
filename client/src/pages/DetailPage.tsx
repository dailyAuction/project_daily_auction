import { CategoryBtn } from '../components/_common/CategoryBtn/CategoryBtn';
import { AuctionStatus } from '../components/DetailPage/AuctionStatus/AuctionStatus';
import { BidInformation } from '../components/DetailPage/BidInformation/BidInformation';
import { Chart } from '../components/DetailPage/Chart/Chart';
import { ImageList } from '../components/DetailPage/ImageList/ImageList';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { CATEGORIES } from '../constants/constants';
import { productDetail } from '../mock/productDetail';

export const DetailPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>상세 페이지</SubHeader>
      <section className="content-layout relative">
        <ImageList url={productDetail.image} />
        <h1 className="text-xl font-semibold">아주 아름다운 모자 판매합니다.</h1>
        <CategoryBtn>{CATEGORIES[productDetail.categoryId]}</CategoryBtn>
        <article className="flex justify-between px-2">
          <span>id : {productDetail.boardId}</span>
          <span>조회수 : {productDetail.viewCount}</span>
        </article>

        <AuctionStatus finishedAt={productDetail.finishedAt} statusId={productDetail.statusId} />

        <BidInformation
          bidCount={productDetail.bidCount}
          statusId={productDetail.statusId}
          startingPrice={productDetail.startingPrice}
          currentPrice={productDetail.currentPrice}
          myPrice={productDetail.myPrice}
          authorId={productDetail.authorId}
          bidderId={productDetail.bidderId}
        />
        <Chart />
        <article>
          엄청난 모자들을 파는 경매가 진행 되고 있는 이 경매는 정말 엄청나고 굉장한 디자인을 가진 모자들을 한번에
          판매하고 있습니다.
        </article>
      </section>
      <TabBar />
    </main>
  );
};

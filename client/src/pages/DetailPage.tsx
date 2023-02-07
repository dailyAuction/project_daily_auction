import { CategoryBtn } from '../components/CategoryBtn';
import { AuctionStatus } from '../components/DetailPage/AuctionStatus';
import { BidInformation } from '../components/DetailPage/BidInformation';
import { Chart } from '../components/DetailPage/Chart';
import { ImageList } from '../components/DetailPage/ImageList';
import { TabBar } from '../components/TabBar';
import { SubHeader } from '../components/Header/SubHeader';
import { productDetail } from '../mock/productDetail';

export const DetailPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>상세 페이지</SubHeader>
      <section className="content-layout">
        <ImageList url={productDetail.image} />
        <h1 className="text-xl font-semibold">아주 아름다운 모자 판매합니다.</h1>
        <CategoryBtn>의류 / 잡화</CategoryBtn>
        <article className="flex justify-between px-2">
          <span>id : 280099</span>
          <span>조회수 : 30</span>
        </article>

        <AuctionStatus finishedAt={productDetail.finishedAt} status={productDetail.status} />

        <BidInformation
          bidCount={productDetail.bidCount}
          status={productDetail.status}
          startingPrice={productDetail.startingPrice}
          currentPrice={productDetail.currentPrice}
          myPrice={productDetail.myPrice}
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

import { Banner } from '../components/MainPage/Banner/Banner';
import { Bestproduct } from '../components/MainPage/BestProduct/BestProduct';
import { ClosingProduct } from '../components/MainPage/ClosingProduct/ClosingProduct';
import { Footer } from '../components/MainPage/Footer/Footer';
import { MainHeader } from '../components/_common/Header/MainHeader/MainHeader';
import { ScrollToTopBtn } from '../components/_common/ScrollToTopBtn/ScrollToTopBtn';
import { TabBar } from '../components/_common/TabBar/TabBar';

export const MainPage = () => {
  return (
    <main className="base-layout bg-white relative overflow-scroll scrollbar-hide">
      <MainHeader>Daily Auction</MainHeader>
      <Banner />
      <ClosingProduct />
      <Bestproduct />
      <Footer />

      <TabBar />

      <ScrollToTopBtn />
    </main>
  );
};

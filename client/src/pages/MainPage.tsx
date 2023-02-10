import { useState } from 'react';
import { Banner } from '../components/MainPage/Banner/Banner';
import { Bestproduct } from '../components/MainPage/BestProduct/BestProduct';
import { ClosingProduct } from '../components/MainPage/ClosingProduct/ClosingProduct';
import { Footer } from '../components/MainPage/Footer/Footer';
import { ToList } from '../components/MainPage/ToList/ToList';
import { MainHeader } from '../components/_common/Header/MainHeader/MainHeader';
import { ScrollToTopBtn } from '../components/_common/ScrollToTopBtn/ScrollToTopBtn';
import { TabBar } from '../components/_common/TabBar/TabBar';
import { products } from '../mock/product';

export const MainPage = () => {
  const [closingProductDetail] = useState(products);
  const [bestProductDetail] = useState(products);

  return (
    <main className="base-layout bg-white">
      <MainHeader>Daily Auction</MainHeader>
      <Banner />
      <ClosingProduct closingProductDetail={closingProductDetail} />
      <Bestproduct bestProductDetail={bestProductDetail} />
      <ToList />
      <Footer />
      <div className="fixed bottom-0 sm:w-[500px] w-screen">
        <TabBar />
      </div>
      <ScrollToTopBtn />
    </main>
  );
};

import { TabBar } from '../components/_common/TabBar/TabBar';
import { MainHeader } from '../components/_common/Header/MainHeader/MainHeader';

export const TempPage = () => {
  return (
    <main className="base-layout">
      <MainHeader>Daily Auction</MainHeader>
      <TabBar />
    </main>
  );
};

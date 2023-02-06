import { TabBar } from '../components/TabBar';
import { Temp } from '../components/temp/Temp';
import { MainHeader } from '../components/Header/MainHeader';

export const TempPage = () => {
  return (
    <main className="base-layout">
      <MainHeader>Daily Auction</MainHeader>
      <Temp />
      <TabBar />
    </main>
  );
};

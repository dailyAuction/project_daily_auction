import { TabBar } from '../components/TabBar';
import { SubHeader } from '../components/Header/SubHeader';
import { MyPageInfo } from '../components/MyPageInfo';

export const MyPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>My</SubHeader>
      <MyPageInfo />
      <TabBar />
    </main>
  );
};

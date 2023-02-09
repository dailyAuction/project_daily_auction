import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { MyPageInfo } from '../components/MyPage/MyPageInfo/MyPageInfo';

export const MyPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>My</SubHeader>
      <MyPageInfo />
      <TabBar />
    </main>
  );
};

import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { Charge } from '../components/ChargePage/Charge/Charge';

export const ChargePage = () => {
  return (
    <main className="base-layout">
      <SubHeader>예치금 충전</SubHeader>
      <Charge />
      <TabBar />
    </main>
  );
};

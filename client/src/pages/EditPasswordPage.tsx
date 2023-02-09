import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { EditPassword } from '../components/EditPasswordPage/EditPassword/EditPassword';

export const EditPasswordPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>비밀번호 변경</SubHeader>
      <EditPassword />
      <TabBar />
    </main>
  );
};

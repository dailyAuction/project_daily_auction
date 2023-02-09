import { TabBar } from '../components/TabBar';
import { SubHeader } from '../components/Header/SubHeader';
import { EditPassword } from '../components/EditPassword';

export const EditPasswordPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>비밀번호 변경</SubHeader>
      <EditPassword />
      <TabBar />
    </main>
  );
};

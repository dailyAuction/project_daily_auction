import { TabBar } from '../components/TabBar';
import { SubHeader } from '../components/Header/SubHeader';
import { Login } from '../components/Login';

export const LoginPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>로그인</SubHeader>
      <Login />
      <TabBar />
    </main>
  );
};

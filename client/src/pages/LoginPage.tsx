import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { Login } from '../components/LoginPage/Login/Login';

export const LoginPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>로그인</SubHeader>
      <Login />
      <TabBar />
    </main>
  );
};

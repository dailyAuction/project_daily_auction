import { TabBar } from '../components/TabBar';
import { SubHeader } from '../components/Header/SubHeader';
import { SignUp } from '../components/SignUp';

export const SignUpPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>회원가입</SubHeader>
      <SignUp />
      <TabBar />
    </main>
  );
};

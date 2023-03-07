import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { SignUp } from '../components/SignUpPage/SignUp/SignUp';

export const SignUpPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>회원가입</SubHeader>
      <SignUp />
      <TabBar />
    </main>
  );
};

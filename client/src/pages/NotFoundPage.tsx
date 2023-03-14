import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { NotFound } from '../components/_common/NotFound/NotFound';
import { TabBar } from '../components/_common/TabBar/TabBar';

export const NotFoundPage = () => {
  return (
    <main className="base-layout bg-white relative overflow-scroll scrollbar-hide">
      <SubHeader>Not Found</SubHeader>
      <NotFound />
      <TabBar />
    </main>
  );
};

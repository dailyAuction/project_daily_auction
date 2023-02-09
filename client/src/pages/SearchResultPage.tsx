import { TabBar } from '../components/_common/TabBar/TabBar';
import { SearchQuery } from '../components/_common/SearchQuery/SearchQuery';
import { MainHeader } from '../components/_common/Header/MainHeader/MainHeader';
import { SearchResultList } from '../components/SearchResultPage/SearchResultList/SearchResultList';

export const SearchResultPage = () => {
  const isLoginUser = true;
  return (
    <main className="base-layout">
      <MainHeader>{`"크라라의 훈장..." 검색 결과`}</MainHeader>
      <section className="content-layout bg-white border-t space-y-9 px-3">
        <SearchQuery />
        <SearchResultList />
      </section>
      <TabBar />
    </main>
  );
};

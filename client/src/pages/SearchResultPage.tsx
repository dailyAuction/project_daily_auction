import { TabBar } from '../components/_common/TabBar/TabBar';
import { SearchQuery } from '../components/_common/SearchQuery/SearchQuery';
import { MainHeader } from '../components/_common/Header/MainHeader/MainHeader';
import { SearchResultList } from '../components/SearchResultPage/SearchResultList/SearchResultList';
import { useGetQueryString } from '../hooks/useGetQueryString';
import { getShortString } from '../utils/getShortString';

export const SearchResultPage = () => {
  const [categoryId, keyword] = useGetQueryString().split('_');
  return (
    <main className="base-layout">
      <MainHeader>{`"${getShortString(keyword, 10)}" 검색 결과`}</MainHeader>
      <section className="content-layout bg-white border-t space-y-9 px-3">
        <SearchQuery />
        <SearchResultList />
      </section>
      <TabBar />
    </main>
  );
};

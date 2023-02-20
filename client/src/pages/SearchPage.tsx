import { TabBar } from '../components/_common/TabBar/TabBar';
import { SubHeader } from '../components/_common/Header/SubHeader/SubHeader';
import { SearchQuery } from '../components/_common/SearchQuery/SearchQuery';
import { TopSearchKeywords } from '../components/SearchPage/TopSearchKeywords/TopSearchKeywords';

export const SearchPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>검색</SubHeader>
      <section className="content-layout bg-white border-t space-y-9 px-3">
        <SearchQuery />
        <TopSearchKeywords />
      </section>
      <TabBar />
    </main>
  );
};

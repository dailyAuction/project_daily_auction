import { TabBar } from '../components/TabBar';
import { SubHeader } from '../components/Header/SubHeader';
import { SearchQuery } from '../components/SearchPage/SearchQuery';
import { TopSearchKeywords } from '../components/SearchPage/TopSearchKeywords';

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

import { TabBar } from '../components/TabBar';
import { SubHeader } from '../components/Header/SubHeader';
import { SearchQuery } from '../components/SearchQuery';
import { TopSearchKeywords } from '../components/SearchPage/TopSearchKeywords';
import { topSearchedKeywordsResp } from '../mock/topSearchedKeywordResp';

export const SearchPage = () => {
  return (
    <main className="base-layout">
      <SubHeader>검색</SubHeader>
      <section className="content-layout bg-white border-t space-y-9 px-3">
        <SearchQuery />
        <TopSearchKeywords keywords={topSearchedKeywordsResp.keywords} />
      </section>
      <TabBar />
    </main>
  );
};

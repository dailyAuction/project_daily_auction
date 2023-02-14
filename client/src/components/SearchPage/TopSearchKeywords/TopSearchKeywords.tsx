import { Link } from 'react-router-dom';

type TopSearchKeywordsProps = {
  keywords: string[];
};

export const TopSearchKeywords = ({ keywords }: TopSearchKeywordsProps) => {
  return (
    <section>
      <h2 className="text-lg font-bold mb-3">인기 검색어</h2>
      <article className="flex flex-col space-y-2">
        {keywords.map((keyword, idx) => (
          <Link to={`/search/0_${keyword}`} key={keyword}>
            <div className="flex cursor-pointer">
              <span className="block w-9">{idx + 1}</span>
              <span>{keyword}</span>
            </div>
          </Link>
        ))}
      </article>
    </section>
  );
};

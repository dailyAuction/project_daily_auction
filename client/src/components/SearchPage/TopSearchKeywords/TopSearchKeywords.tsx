import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { searchAPI } from '../../../api/searchAPI';

export const TopSearchKeywords = () => {
  const { isLoading, error, data } = useQuery('topSearch', () => searchAPI.getTop10(), {
    onError: (e) => console.error(e),
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { keywords } = data || {};

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생하였습니다.</div>;

  return (
    <section>
      <h2 className="text-lg font-bold mb-3">인기 검색어</h2>
      <article className="flex flex-col space-y-2">
        {keywords.length ? (
          keywords.map((keyword, idx) => (
            <Link to={`/search/0_${keyword}`} key={keyword}>
              <div className="flex cursor-pointer">
                <span className="block w-9">{idx + 1}</span>
                <span>{keyword}</span>
              </div>
            </Link>
          ))
        ) : (
          <span>인기 검색어가 없습니다.</span>
        )}
      </article>
    </section>
  );
};

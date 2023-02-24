import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginStateAtom } from '../../../atoms/user';

const TAB_TITLE = ['', 'category', 'search', 'postProduct', 'my'];

const TabIcon = ({ children, idx }) => {
  const location = useLocation();
  const loginState = useRecoilValue(loginStateAtom);

  const getDestination = (endpoint: string) => {
    if (!loginState && endpoint === 'my') return 'login';
    return endpoint;
  };

  return (
    <Link
      to={`/${getDestination(TAB_TITLE[idx])}`}
      className={`text-base flex flex-col justify-center items-center cursor-pointer ${
        location.pathname === `/${TAB_TITLE[idx]}` && 'text-main-red'
      }`}>
      {children === '' && (
        <>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </i>
          <span>홈</span>
        </>
      )}
      {children === 'category' && (
        <>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </i>
          <span>카테고리</span>
        </>
      )}
      {children === 'search' && (
        <>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </i>
          <span>검색</span>
        </>
      )}
      {children === 'postProduct' && (
        <>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </i>
          <span>상품 등록</span>
        </>
      )}
      {children === 'my' && (
        <>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </i>
          <span>My</span>
        </>
      )}
    </Link>
  );
};

export const TabBar = () => {
  return (
    <nav className="flex shrink-0 w-full h-[75px] sticky top-[100vh] bg-white justify-between items-center px-7 border-t">
      {TAB_TITLE.map((title, idx) => (
        <TabIcon key={title} idx={idx}>
          {title}
        </TabIcon>
      ))}
    </nav>
  );
};

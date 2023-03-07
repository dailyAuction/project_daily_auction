import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginStateAtom, userInfoAtom } from '../../../../atoms/user';
import { useNotification } from '../../../../hooks/useNotification';

export const MainHeader = ({ children }) => {
  const { notifications } = useNotification();
  const { coin } = useRecoilValue(userInfoAtom);
  const loginState = useRecoilValue(loginStateAtom);

  return (
    <header className="h-14 w-full sticky bg-main-brown py-3">
      <div className="h-full mx-3 text-white flex justify-between items-center">
        <h1 className="font-bold text-lg">{children}</h1>
        {loginState ? (
          <div className="flex gap-3">
            <span className="">{coin.toLocaleString()} coin</span>
            <Link to="/notification">
              <>
                <div className="top-3 right-3 absolute w-3.5 h-3.5 rounded-full text-xs flex justify-center items-center bg-red-600">
                  {notifications?.length || 0}
                </div>
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
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </i>
              </>
            </Link>
          </div>
        ) : (
          <Link to="/search">
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
          </Link>
        )}
      </div>
    </header>
  );
};

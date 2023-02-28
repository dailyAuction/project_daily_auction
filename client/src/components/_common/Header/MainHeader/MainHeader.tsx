import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginStateAtom } from '../../../../atoms/user';
import { useSSE } from '../../../../hooks/useSSE';

export const MainHeader = ({ children }) => {
  const loginState = useRecoilValue(loginStateAtom);
  const { fetchSSE, eventSource } = useSSE();

  // 로그인이 되어있는 경우에만 알림을 수신하도록 SSE를 연결합니다.
  // TODO: 어떤 컴포넌트에서든 연결을 유지하도록 변경할 것
  useEffect(() => {
    if (loginState) {
      fetchSSE();
    }

    return () => eventSource.current?.close();
  }, [eventSource]);

  return (
    <header className="h-14 w-full sticky bg-main-brown py-3">
      <div className="h-full mx-3 text-white flex justify-between items-center">
        <h1 className="font-bold text-lg">{children}</h1>
        <div className="flex gap-3">
          <span className="">10,000 coin</span>
          <Link to="/notification">
            <>
              <div className="top-3 right-3 absolute w-3.5 h-3.5 rounded-full text-xs flex justify-center items-center bg-red-600">
                3
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
      </div>
    </header>
  );
};

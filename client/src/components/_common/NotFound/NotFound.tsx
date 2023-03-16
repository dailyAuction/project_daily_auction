import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <section className="w-full h-full flex flex-col gap-2 justify-center items-center text-main-brown">
      <span className="font-semibold text-2xl ">페이지를 찾을 수 없습니다!</span>
      <Link to="/" className="hover:text-main-red flex justify-center items-center text-lg font-semibold">
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </i>
        으로 이동
      </Link>
    </section>
  );
};

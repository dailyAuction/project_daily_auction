import { useNavigate } from 'react-router-dom';

export const SubHeader = ({ children }) => {
  const navigate = useNavigate();

  return (
    <header className="h-14 w-full sticky bg-white">
      <div className="h-full mx-3 text-main-brown flex items-center">
        <svg
          onClick={() => navigate(-1)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 fixed">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <h1 className="text-lg font-bold w-full flex justify-center items-center">{children}</h1>
      </div>
    </header>
  );
};

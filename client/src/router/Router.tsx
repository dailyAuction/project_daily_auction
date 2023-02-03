import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TempPage } from '../pages/TempPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TempPage />} />
      </Routes>
    </BrowserRouter>
  );
};

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Temp } from '../components/temp/Temp';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Temp />} />
      </Routes>
    </BrowserRouter>
  );
};

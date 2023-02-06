import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryPage } from '../pages/Category';
import { DetailPage } from '../pages/DetailPage';
import { MyPage } from '../pages/MyPage';
import { PostProductPage } from '../pages/PostProductPage';
import { SearchPage } from '../pages/Search';
import { TempPage } from '../pages/TempPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TempPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/postProduct" element={<PostProductPage />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryPage } from '../pages/CategoryPage';
import { DetailPage } from '../pages/DetailPage';
import { MyPage } from '../pages/MyPage';
import { NotificationPage } from '../pages/NoficationPage';
import { PostProductPage } from '../pages/PostProductPage';
import { SearchPage } from '../pages/SearchPage';
import { TempPage } from '../pages/TempPage';
import { CategoryProductListPage } from '../pages/CategoryProductListPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { EditPasswordPage } from '../pages/EditPasswordPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TempPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/postProduct" element={<PostProductPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/editPassword" element={<EditPasswordPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/categoryProduct" element={<CategoryProductListPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

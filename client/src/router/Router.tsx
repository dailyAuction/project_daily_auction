import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryPage } from '../pages/CategoryPage';
import { DetailPage } from '../pages/DetailPage';
import { MyPage } from '../pages/MyPage';
import { NotificationPage } from '../pages/NoficationPage';
import { PostProductPage } from '../pages/PostProductPage';
import { SearchPage } from '../pages/SearchPage';
import { CategoryProductListPage } from '../pages/CategoryProductListPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { RegisterProductPage } from '../pages/RegisterProductPage';
import { EditPassword } from '../components/EditPasswordPage/EditPassword/EditPassword';
import { SearchResultPage } from '../pages/SearchResultPage';
import { MainPage } from '../pages/MainPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:query" element={<SearchResultPage />} />
        <Route path="/postProduct" element={<PostProductPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/editPassword" element={<EditPassword />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/categoryProduct" element={<CategoryProductListPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/registerProduct" element={<RegisterProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

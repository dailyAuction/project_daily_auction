import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryPage } from '../pages/CategoryPage';
import { DetailPage } from '../pages/DetailPage';
import { MyPage } from '../pages/MyPage';
import { NotificationPage } from '../pages/NoficationPage';
import { SearchPage } from '../pages/SearchPage';
import { CategoryProductListPage } from '../pages/CategoryProductListPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { EditPasswordPage } from '../pages/EditPasswordPage';
import { PostProductPage } from '../pages/PostProductPage';
import { SearchResultPage } from '../pages/SearchResultPage';
import { ChargePage } from '../pages/ChargePage';
import { MainPage } from '../pages/MainPage';
import { MyAuctionList } from '../components/MyPage/MyAuctionList/MyAuctionList';
import { SocialLogin } from '../components/LoginPage/SocialLogin/SocialLogin';

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
        <Route path="/my/auctionList" element={<MyAuctionList />} />
        <Route path="/my/joinList" element={<MyAuctionList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/editPassword" element={<EditPasswordPage />} />
        <Route path="/charge" element={<ChargePage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/categoryProduct/:id" element={<CategoryProductListPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/callback/*" element={<SocialLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

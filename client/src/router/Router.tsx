import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazyImport } from '../utils/lazyImport';

const { MainPage } = lazyImport(() => import('../pages/MainPage'), 'MainPage');
const { CategoryPage } = lazyImport(() => import('../pages/CategoryPage'), 'CategoryPage');

const { DetailPage } = lazyImport(() => import('../pages/DetailPage'), 'DetailPage');
const { MyPage } = lazyImport(() => import('../pages/MyPage'), 'MyPage');
const { NotificationPage } = lazyImport(() => import('../pages/NoficationPage'), 'NotificationPage');
const { SearchPage } = lazyImport(() => import('../pages/SearchPage'), 'SearchPage');
const { CategoryProductListPage } = lazyImport(
  () => import('../pages/CategoryProductListPage'),
  'CategoryProductListPage'
);
const { LoginPage } = lazyImport(() => import('../pages/LoginPage'), 'LoginPage');
const { SignUpPage } = lazyImport(() => import('../pages/SignUpPage'), 'SignUpPage');
const { EditPasswordPage } = lazyImport(() => import('../pages/EditPasswordPage'), 'EditPasswordPage');
const { PostProductPage } = lazyImport(() => import('../pages/PostProductPage'), 'PostProductPage');
const { SearchResultPage } = lazyImport(() => import('../pages/SearchResultPage'), 'SearchResultPage');
const { ChargePage } = lazyImport(() => import('../pages/ChargePage'), 'ChargePage');
const { MyAuctionList } = lazyImport(() => import('../components/MyPage/MyAuctionList/MyAuctionList'), 'MyAuctionList');
const { SocialLogin } = lazyImport(() => import('../components/LoginPage/SocialLogin/SocialLogin'), 'SocialLogin');
const { Loading } = lazyImport(() => import('../components/_common/Loading/Loading'), 'Loading');

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </BrowserRouter>
  );
};

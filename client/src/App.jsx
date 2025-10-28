import { lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './components/pages/Home';
import ProductsCollection from './components/pages/ProductCollection';
import { Toaster } from '@/components/ui/sonner';
import { LoginModal } from './components/ui/modal/LoginModal';
const Cart = lazy(() => import('./components/pages/Cart'));
const Checkout = lazy(() => import('./components/pages/Checkout'));
const Shop = lazy(() => import('./components/pages/Shop'));
const PageNotFound = lazy(() => import('./components/pages/PageNotFound'));
const ServerError = lazy(() => import('./components/pages/ServerError'));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/account" element={<>Account</>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/shop/:collectionSlug"
            element={<ProductsCollection />}
          />
          <Route path="/server-error" element={<ServerError />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <LoginModal />
      <Toaster position="top" />
    </BrowserRouter>
  );
}

export default App;

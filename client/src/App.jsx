import { lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import PageNotFound from './components/pages/PageNotFound';
const ServerError = lazy(() => import('./components/pages/ServerError'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<>Shop</>} />
          <Route path="/account" element={<>Account</>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/server-error" element={<ServerError />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

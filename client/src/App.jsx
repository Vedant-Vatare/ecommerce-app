import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './components/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<>Shop</>} />
          <Route path="/account" element={<>Account</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

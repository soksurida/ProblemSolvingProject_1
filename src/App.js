import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroVideo from './components/HeroVideo';
import ProductPage from './components/ProductPage';
import LoginPage from './components/LoginPage'; // ✅ 로그인 페이지 import 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroVideo />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* ✅ 로그인 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;

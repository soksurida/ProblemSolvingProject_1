import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroVideo from './components/HeroVideo';
import ProductPage from './components/ProductPage'; // ⬅️ ProductPage 컴포넌트도 import
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';
import GetYourChocoPage from './components/GetYourChocoPage'; 
import LoginPage from './components/LoginPage'; // ✅ 로그인 페이지 import 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroVideo />} />
        <Route path="/product" element={<ProductPage />} />
        {/* Get Your Choco 화면 */}
        <Route path="/getyourchoco" element={<GetYourChocoPage />} />
        {/* 테스트 시작 화면 */}
        <Route path="/start" element={<QuestionPage />} />
        {/* 테스트 결과 화면 */}
        <Route path="/result" element={<ResultPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* ✅ 로그인 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;

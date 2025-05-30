// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroVideo from './components/HeroVideo';
import ProductPage from './components/ProductPage';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';
import GetYourChocoPage from './components/GetYourChocoPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
<<<<<<< HEAD
import OurStory from './components/OurStory'; // 파일 위치가 ./components라면 이렇게
import CartPage from './components/CartPage';
=======
import OurStory from './components/OurStory';
import Community from './components/Community'; // ✅ 커뮤니티 페이지 import 추가
>>>>>>> 88a6eb542998ad5eeb90763c9ab1079b69ea5304

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인 화면 */}
        <Route path="/" element={<HeroVideo />} />
        
        {/* 상품 페이지 */}
        <Route path="/product" element={<ProductPage />} />

        {/* 초코 성격 테스트 페이지 */}
        <Route path="/getyourchoco" element={<GetYourChocoPage />} />
        <Route path="/start" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />} />

        {/* 회원 관련 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 브랜드 소개 */}
        <Route path="/brand" element={<OurStory />} />
        <Route path="/cart" element={<CartPage />} />

        {/* ✅ 커뮤니티 페이지 경로 추가 */}
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;

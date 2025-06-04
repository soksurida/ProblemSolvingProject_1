import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './components/CartPage';
import Community from './components/Community';
import GetYourChocoPage from './components/GetYourChocoPage';
import HeroVideo from './components/HeroVideo';
import LoginPage from './components/LoginPage';
import OurStory from './components/OurStory';
import PaymentPage from './components/PaymentPage'; //임시 결제창 페이지
import ProductDetail from './components/ProductDetail'; // ✅ 상세페이지 컴포넌트 추가
import ProductPage from './components/ProductPage';
import SignupPage from './components/SignupPage';
import GuestAgreement from './components/GuestAgreement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/getyourchoco" element={<GetYourChocoPage />} />
        <Route path="/" element={<HeroVideo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/brand" element={<OurStory />} />
        <Route path="/payment" element={<PaymentPage />} /> {/*임시 결제창 페이지 주소*/}
        <Route path="/product/:id" element={<ProductDetail />} /> {/* ✅ 상세페이지 라우팅 추가 */}
        <Route path="/product" element={<ProductPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/guest" element={<GuestAgreement />} />

      </Routes>
    </Router>
  );
}

export default App;

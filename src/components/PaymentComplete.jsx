// PaymentComplete.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './PaymentComplete.css'; // 선택

function PaymentComplete() {
  return (
    <>
      <Header />
      <div className="payment-complete-container">
        <h2>결제가 완료되었습니다!</h2>
        <p>소중한 주문 감사합니다. 주문 내역은 마이페이지에서 확인할 수 있습니다.</p>
        <a href="/" className="home-btn">홈으로 가기</a>
      </div>
      <Footer />
    </>
  );
}

export default PaymentComplete;

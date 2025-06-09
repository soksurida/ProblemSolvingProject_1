import React from 'react';
import './LoginModal.css';
import { useNavigate } from 'react-router-dom';

function LoginModal({ onClose, onGuestBuy }) {
  const navigate = useNavigate();

  const goToLogin = () => {
    onClose();
    navigate('/login');
  };

  const goToSignup = () => {
    onClose();
    navigate('/signup');
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <button className="login-modal-close" onClick={onClose}>×</button>
        <h2>확인</h2>
        <p>비회원 구매 시,<br />할인/포인트 적립/사은품 혜택이 미적용됩니다.</p>
        <p><strong>신규회원 가입 시 10% 할인 쿠폰 증정</strong></p>

        <div className="login-modal-actions">
          <button className="btn login" onClick={goToLogin}>로그인</button>
          <button className="btn signup" onClick={goToSignup}>회원가입</button>
        </div>

        {/* ✅ 여기서 onGuestBuy() 호출이 핵심! */}
        <p className="guest-buy" onClick={() => {
          if (onGuestBuy) {
            onGuestBuy();
          }
        }}>
          비회원으로 구매하기
        </p>
      </div>
    </div>
  );
}

export default LoginModal;

import React from 'react';
import './LoginModal.css';
import { useNavigate } from 'react-router-dom';  // ✅ 추가

function LoginModal({ onClose }) {
  const navigate = useNavigate(); // ✅ 추가

  // 이동 후 모달 닫기
  const goToLogin = () => {
    onClose();
    navigate('/login');
  };

  const goToSignup = () => {
    onClose();
    navigate('/signup');
  };

  const goToGuest = () => {
  onClose();
  navigate('/guest');
};

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>확인</h2>
        <p>비회원 구매 시,<br />할인/포인트 적립/사은품 혜택이 미적용됩니다.</p>
        <p><strong>신규회원 가입 시 10% 할인 쿠폰 증정</strong></p>
        
        <div className="modal-actions">
          <button className="btn login" onClick={goToLogin}>로그인</button>
          <button className="btn signup" onClick={goToSignup}>회원가입</button>
        </div>

        <p className="guest-buy" onClick={goToGuest}>비회원으로 구매하기</p>

      </div>
    </div>
  );
}

export default LoginModal;

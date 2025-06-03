import React from 'react';
import './LoginModal.css';

function LoginModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>확인</h2>
        <p>비회원 구매 시,<br />할인/포인트 적립/사은품 혜택이 미적용됩니다.</p>
        <p><strong>신규회원 가입 시 10% 할인 쿠폰 증정</strong></p>
        <div className="modal-actions">
          <button className="btn login">로그인</button>
          <button className="btn signup">회원가입</button>
        </div>
        <p className="guest-buy">비회원으로 구매하기</p>
      </div>
    </div>
  );
}

export default LoginModal;

import React from 'react';
import './CartConfirmModal.css';
import { useNavigate } from 'react-router-dom';

function CartConfirmModal({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal-content">
        <p>장바구니로 이동하시겠습니까?</p>
        <div className="cart-modal-actions">
          <button className="btn-outline" onClick={onClose}>계속 쇼핑하기</button>
          <button className="btn-black" onClick={() => navigate('/cart')}>장바구니 가기</button>
        </div>
      </div>
    </div>
  );
}

export default CartConfirmModal;

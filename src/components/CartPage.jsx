import React from 'react';
import './CartPage.css';
import Header from './Header';
import chocoImg from '../assets/choco.png'; // 이미지 경로에 맞게 수정

function CartPage() {
  return (
    <div className="cart-page">
      <Header />
      <div className="cart-steps">
        <span className="step active">01 장바구니</span>
        <span> &gt; </span>
        <span>02 배송정보</span>
        <span> &gt; </span>
        <span>03 주문완료</span>
      </div>

      <div className="cart-container">
        {/* 상품 목록 */}
        <div className="cart-left">
          <div className="cart-header">
            <input type="checkbox" checked readOnly /> 전체 선택
          </div>

          <div className="cart-item">
            <input type="checkbox" checked readOnly />
            <img src={chocoImg} alt="초코우유" />
            <div className="item-info">
              <div className="item-name">[배러우유] 배러 초코우유 진한</div>
              <div className="item-desc">1회 제공 기준 180ml(130kcal)</div>
              <div className="item-quantity">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <div className="item-price">2,500원</div>
              <button className="buy-now">바로구매</button>
            </div>
          </div>

          <div className="cart-actions">
            <button className="order-selected">선택상품 주문</button>
            <button className="order-all">전체상품 주문하기</button>
          </div>

          <p className="cart-note">장바구니에 보관된 상품은 3개월 후에 삭제 됩니다.</p>
        </div>

        {/* 결제 요약 */}
        <div className="cart-right">
          <div className="summary">
            <div className="summary-row"><span>상품 금액</span><span>+2,500원</span></div>
            <div className="summary-row"><span>상품 할인</span><span>+0원</span></div>
            <div className="summary-row"><span>포장비</span><span>+0원</span></div>
            <div className="summary-row"><span>배송비</span><span>+3,000원</span></div>
            <div className="summary-total"><span>결제 예상 금액</span><span>5,500원</span></div>
          </div>
          <button className="checkout-button">5,500원 주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

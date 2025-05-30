import React, { useEffect, useState } from 'react';
import './CartPage.css';
import Header from './Header';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  // localStorage에서 장바구니 불러오기
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  // 총 가격 계산
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 0;
  const finalPrice = totalPrice + deliveryFee;

  return (
    <div className="cart-page">
      <Header />

      <div className="cart-container">
        {/* 왼쪽 영역 */}
        <div className="cart-left">
          {/* 장바구니 제목 */}
          <div className="cart-steps">장바구니</div>

          {/* 선택 영역 */}
          <div className="cart-header">
            <label>
              <input type="checkbox" checked readOnly /> 전체선택
            </label>
            <span className="delete-selected">선택 삭제</span>
          </div>

          {/* 비어있는 경우 */}
          {cartItems.length === 0 ? (
            <div className="cart-empty">장바구니에 담긴 상품이 없습니다.</div>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <input type="checkbox" checked readOnly />
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-desc">{item.desc}</div>
                  <div className="item-quantity">
                    <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                  </div>
                  <div className="item-price">{item.price.toLocaleString()}원</div>
                  <button className="buy-now">바로구매</button>
                </div>
              </div>
            ))
          )}

          {/* 버튼 영역 */}
          <div className="cart-actions">
            <button className="order-selected">선택상품 주문</button>
            <button className="order-all">전체상품 주문하기</button>
          </div>

          {/* 안내 문구 */}
          <p className="cart-note">장바구니에 보관된 상품은 3개월 후에 삭제 됩니다.</p>
        </div>

        {/* 결제 요약 영역 */}
        <div className="cart-right">
          <div className="summary">
            <div className="summary-row"><span>상품 금액</span><span>+{totalPrice.toLocaleString()}원</span></div>
            <div className="summary-row"><span>상품 할인</span><span>-0원</span></div>
            <div className="summary-row"><span>포장비</span><span>+0원</span></div>
            <div className="summary-row"><span>부가 쇼핑백</span><span>+0원</span></div>
            <div className="summary-row"><span>배송비</span><span>+{deliveryFee.toLocaleString()}원</span></div>
            <div className="summary-total"><span>결제 예상 금액</span><span>{finalPrice.toLocaleString()}원</span></div>
          </div>
          <button className="checkout-button">{finalPrice.toLocaleString()}원 주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

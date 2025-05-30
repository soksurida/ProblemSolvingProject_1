import React, { useEffect, useState } from 'react';
import './CartPage.css';
import Header from './Header';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // localStorage에서 장바구니 불러오기
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    setSelectedItems(savedCart.map(item => item.id));
    setSelectAll(true);
  }, []);

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      const allIds = cartItems.map(item => item.id);
      setSelectedItems(allIds);
      setSelectAll(true);
    }
  };

  // 개별 선택/해제
  const handleItemSelect = (id) => {
    if (selectedItems.includes(id)) {
      const updated = selectedItems.filter(itemId => itemId !== id);
      setSelectedItems(updated);
      setSelectAll(false);
    } else {
      const updated = [...selectedItems, id];
      setSelectedItems(updated);
      if (updated.length === cartItems.length) setSelectAll(true);
    }
  };

  // 수량 증가
  const increaseQuantity = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  // 수량 감소
  const decreaseQuantity = (id) => {
    const updated = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  // 선택 삭제
  const deleteSelectedItems = () => {
    const updated = cartItems.filter(item => !selectedItems.includes(item.id));
    setCartItems(updated);
    setSelectedItems([]);
    setSelectAll(false);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

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
          <div className="cart-steps">장바구니</div>

          {/* 선택 영역 */}
          <div className="cart-header">
            <label>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              /> 전체선택
            </label>
            <span className="delete-selected" onClick={deleteSelectedItems}>선택 삭제</span>
          </div>

          {/* 비어있을 때 */}
          {cartItems.length === 0 ? (
            <div className="cart-empty">장바구니에 담긴 상품이 없습니다.</div>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleItemSelect(item.id)}
                />
                <img src={item.image} alt={item.name} className="item-thumbnail" />

                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-desc">{item.desc}</div>
                </div>

                <div className="item-quantity">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <div className="item-price">{item.price.toLocaleString()}원</div>
                <button className="buy-now">바로구매</button>
              </div>
            ))
          )}

          {/* 주문 버튼 */}
          <div className="cart-actions">
            <button className="order-selected">선택상품 주문</button>
            <button className="order-all">전체상품 주문하기</button>
          </div>

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

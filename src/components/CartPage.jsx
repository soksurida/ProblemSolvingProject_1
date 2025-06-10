import React, { useEffect, useState } from 'react';
import './CartPage.css';
import Header from './Header';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    setSelectedItems(savedCart.map(item => item.id));
    setSelectAll(true);
  }, []);

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

  const increaseQuantity = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const decreaseQuantity = (id) => {
    const updated = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const deleteSelectedItems = () => {
    const updated = cartItems.filter(item => !selectedItems.includes(item.id));
    setCartItems(updated);
    setSelectedItems([]);
    setSelectAll(false);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleGuestBuy = () => {
    const itemsToBuy = selectedItems.length > 0
      ? cartItems.filter(item => selectedItems.includes(item.id))
      : cartItems;

    if (itemsToBuy.length === 0) return alert('주문할 상품이 없습니다.');

    localStorage.setItem('cart', JSON.stringify(itemsToBuy));
    localStorage.removeItem('directBuy');
    setShowModal(false);
    navigate('/guest-agreement');
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = totalPrice >= 20000 ? 0 : 2500;
  const finalPrice = totalPrice + deliveryFee;

  return (
    <div className="cart-page">
      <Header />

      <div className="cart-container">
        <div className="cart-left">
          <div className="cart-steps">장바구니</div>

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
                <img
                  src={item.image}
                  alt={item.name}
                  className="item-thumbnail"
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{ cursor: 'pointer' }}
                />

                <div className="item-info">
                  <div
                    className="item-name"
                    onClick={() => navigate(`/product/${item.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.name}
                  </div>
                  <div className="item-desc">{item.desc}</div>
                </div>

                <div className="item-quantity">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <div className="item-price">{(item.price * item.quantity).toLocaleString()}원</div>
                <button className="buy-now" onClick={() => setShowModal(true)}>바로구매</button>
              </div>
            ))
          )}

          <div className="cart-actions">
            <button className="order-selected" onClick={() => setShowModal(true)}>선택상품 주문</button>
            <button className="order-all" onClick={() => setShowModal(true)}>전체상품 주문하기</button>
          </div>

          <p className="cart-note">장바구니에 보관된 상품은 3개월 후에 삭제 됩니다.</p>
        </div>

        <div className="cart-right">
          <div className="summary">
            <div className="summary-row">
              <span>상품 금액</span>
              <span>+{totalPrice.toLocaleString()}원</span>
            </div>
            <div className="summary-row"><span>상품 할인</span><span>-0원</span></div>
            <div className="summary-row"><span>포장비</span><span>+0원</span></div>
            <div className="summary-row"><span>부가 쇼핑백</span><span>+0원</span></div>
            <div className="summary-row">
              <span>배송비</span>
              <span>{deliveryFee === 0 ? "무료배송" : `+${deliveryFee.toLocaleString()}원`}</span>
            </div>
            <div className="summary-total">
              <span>결제 예상 금액</span>
              <span>{finalPrice.toLocaleString()}원</span>
            </div>
          </div>

          <button className="checkout-button" onClick={() => setShowModal(true)}>
            {finalPrice.toLocaleString()}원 주문하기
          </button>
        </div>
      </div>
      <Footer />

      {showModal && <LoginModal onClose={() => setShowModal(false)} onGuestBuy={handleGuestBuy} />}
    </div>
  );
}

export default CartPage;
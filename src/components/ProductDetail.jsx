import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';

import Header from './Header';
import LoginModal from '../components/LoginModal';
import CartConfirmModal from './CartConfirmModal';
import RelatedProducts from './RelatedProducts';
import ProductInfo from './ProductInfo';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  const [modalOpen, setModalOpen] = useState(false); // 로그인 모달
  const [showCartModal, setShowCartModal] = useState(false); // 장바구니 확인 모달

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <p>존재하지 않는 상품입니다.</p>;

  const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''));

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const addToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: priceNumber,
      image: product.image,
      quantity: quantity,
      desc: product.description || '기분이 좋아지는 초코우유!'
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = existingCart.findIndex(item => item.id === cartItem.id);

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    // ✅ 장바구니 안내 모달 띄우기
    setShowCartModal(true);
  };

  return (
    <>
      <Header />
      <section className="product-detail">
        <div className="product-content">
          <img className="product-detail-image" src={product.image} alt={product.name} />
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="subtitle">{product.description || '기분이 좋아지는 초코우유!'}</p>
            <p className="price">{product.price}</p>

            <div className="quantity-control">
              <button onClick={decrease}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={increase}>+</button>
            </div>

            <p className="total-label">
              상품금액 합계
              <span className="total-amount">{(priceNumber * quantity).toLocaleString()}원</span>
            </p>

            <p className="origin">
              원산지 : {product.category.includes('해외') ? '해외' : '한국'}
            </p>

            <div className="purchase-buttons">
              <button className="detail-buy-now" onClick={() => setModalOpen(true)}>
                바로 구매하기
              </button>

              <button className="detail-add-cart" onClick={addToCart}>
                장바구니 담기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 모달 연결 */}
      {modalOpen && <LoginModal onClose={() => setModalOpen(false)} />}
      {showCartModal && <CartConfirmModal onClose={() => setShowCartModal(false)} />}

      {/* ✅ 하단 상세 정보와 관련 상품을 감싸고, 상품 상세를 오른쪽으로 이동 */}
      <div className="product-lower-section">
        <div className="product-info-wrapper"> {/* ✅ 오른쪽 여백 적용용 wrapper */}
          <ProductInfo />
        </div>
        <RelatedProducts
          currentProductId={product.id}
          currentCategory={product.category}
        />
      </div>
    </>
  );
}

export default ProductDetail;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ useNavigate 추가
import products from '../data/products'; // 상품 배열 import
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams(); // URL에서 상품 ID 받아오기
  const navigate = useNavigate(); // ✅ 페이지 이동용 훅
  const product = products.find(p => p.id === Number(id)); // 해당 상품 찾기
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  if (!product) return <p>존재하지 않는 상품입니다.</p>;

  // 가격에서 숫자 추출
  const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''));

  // ✅ 장바구니 담기 함수
  const addToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: priceNumber,
      image: product.image,
      quantity: quantity,
      desc: product.description || '기분이 좋아지는 초코우유!'
    };

    // 기존 장바구니 불러오기
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    // 동일한 상품 있는지 체크
    const existingIndex = existingCart.findIndex(item => item.id === cartItem.id);

    if (existingIndex !== -1) {
      // 이미 있으면 수량만 증가
      existingCart[existingIndex].quantity += quantity;
    } else {
      // 새 상품이면 추가
      existingCart.push(cartItem);
    }

    // localStorage에 저장
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // 장바구니 페이지로 이동
    navigate('/cart');
  };

  return (
    <section className="product-detail">
      <div className="breadcrumb">홈 &gt; {product.category}</div>
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
            원산지 {product.category.includes('해외') ? '해외' : '한국'}<br />
            상품요약정보 클래식한 한 잔 국민 초코우유
          </p>

          <div className="purchase-buttons">
            <button className="detail-buy-now">바로 구매하기</button>
            <button className="detail-add-cart" onClick={addToCart}>장바구니 담기</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;

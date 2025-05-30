// src/components/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products'; // 상품 배열을 따로 분리했다면 import
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams(); // URL에서 상품 ID 받아오기
  const product = products.find(p => p.id === Number(id)); // 해당 상품 찾기
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  if (!product) return <p>존재하지 않는 상품입니다.</p>;

  // 가격에서 숫자 추출
  const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''));

  return (
    <section className="product-detail">
      <div className="breadcrumb">홈 &gt; {product.category}</div>
      <div className="product-content">
        <img className="product-image" src={product.image} alt={product.name} />
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
            <button className="buy-now">바로 구매하기</button>
            <button className="add-cart">장바구니 담기</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;

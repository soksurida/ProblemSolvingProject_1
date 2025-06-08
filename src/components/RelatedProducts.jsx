import React from 'react';
import { Link } from 'react-router-dom'; // 🔥 꼭 추가!
import './RelatedProducts.css';
import products from '../data/products';

function RelatedProducts({ currentProductId, currentCategory }) {
  const sameCategory = products.filter(
    (p) => p.category === currentCategory && p.id !== currentProductId
  );

  return (
    <section className="related-products">
      <h3>이런 상품은 어때요?</h3>
      <div className="horizontal-scroll-wrapper">
        {sameCategory.map(({ id, name, image, price }) => (
          <Link
            to={`/product/${id}`} // ✅ 상세페이지로 이동
            key={id}
            className="product-card" // ✅ 기존 스타일 그대로
          >
            <img src={image} alt={name} className="related-product-img" />
            <p className="product-name">{name}</p>
            <p className="product-price">{price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;

import React from 'react';
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
          <div key={id} className="product-card">
            <img src={image} alt={name} className="related-product-img" />
            <p className="product-name">{name}</p>
            <p className="product-price">{price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
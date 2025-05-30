import React from 'react';
import './RelatedProducts.css';

import nesquik from '../images/nesquik.png';
import hersheys from '../images/hershey\'s.png';
import cacaolat from '../images/cacaolat.png';

function RelatedProducts() {
  const products = [
    { id: 1, name: 'Nesquik', img: nesquik },
    { id: 2, name: 'Hershey\'s', img: hersheys },
    { id: 3, name: 'Cacaolat', img: cacaolat },
  ];

  return (
    <section className="related-products">
      <h3>Related Products</h3>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img
              src={product.img}
              alt={product.name}
              style={{ width: '100px', height: 'auto', objectFit: 'contain', display: 'block' }}
            />


            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;

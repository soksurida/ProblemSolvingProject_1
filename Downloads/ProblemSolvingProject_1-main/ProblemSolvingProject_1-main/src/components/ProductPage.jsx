import React, { useState } from 'react';
import './ProductPage.css';

const products = [
  {
    name: '네스퀵 초콜릿 드링크 180ml',
    price: '$10.99',
    image: '/images/nesquik.jpg',
    category: '전체'
  },
  {
    name: '하이 초콜릿 드링크',
    price: '$10.99',
    image: '/images/hi-choco.jpg',
    category: '전체'
  },
  {
    name: '코스트코 코리아 멸균우유',
    price: '$10.99',
    image: '/images/korea-milk.jpg',
    category: '국내제품'
  },
  {
    name: '카카오얌 오리지널 200ml',
    price: '$10.99',
    image: '/images/cacao-original.jpg',
    category: '수입제품'
  },
];

const ProductPage = () => {
  const [selectedTab, setSelectedTab] = useState('전체');
  const filtered = selectedTab === '전체' ? products : products.filter(p => p.category === selectedTab);

  return (
    <div className="product-container">
      <h1 className="best-title">Best</h1>

      <div className="best-product">
        <img src="/images/seoulmilk.jpg" alt="서울우유" className="best-image" />
        <div className="best-description">
          <h2>서울 우유 초콜릿</h2>
          <p className="subheading">서울 우유</p>
          <p className="price">2,000원</p>
          <p className="body">한국의 대표 초코 우유.</p>
          <button className="add-to-cart">Add to cart</button>
          <p className="fine-print">Text box for additional details or fine print</p>
        </div>
      </div>

      <div className="tabs">
        {['전체', '국내제품', '수입제품'].map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button>{'<<'}</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>{'>>'}</button>
      </div>
    </div>
  );
};

export default ProductPage;

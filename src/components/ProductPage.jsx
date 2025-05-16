import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import Header from './Header';

const bestProducts = [
  {
    name: '서울 우유 초콜릿',
    price: '2,000원',
    image: '/images/seoulmilk.jpg',
  },
  {
    name: '네스퀵 초콜릿 드링크 180ml',
    price: '$10.99',
    image: '/images/nesquik.png',
  },
  {
    name: '허쉬 초콜릿 드링크',
    price: '$10.99',
    image: '/images/hershey.png',
  },
  {
    name: '초코에몽 밀크',
    price: '1,800원',
    image: '/images/chocomong.jpg',
  },
  {
    name: '빙그레 초코우유',
    price: '1,500원',
    image: '/images/binggrae.jpg',
  },
];

const products = [
  {
    name: '네스퀵 초콜릿 드링크 180ml',
    price: '$10.99',
    image: '/images/nesquik.png',
    category: '전체',
  },
  {
    name: '허쉬 초콜릿 드링크',
    price: '$10.99',
    image: '/images/hershey.png',
    category: '전체',
  },
  {
    name: 'horrizon 우유',
    price: '$10.99',
    image: '/images/horrizon.png',
    category: '국내제품',
  },
  {
    name: 'cacaolat 오리지널 200ml',
    price: '$10.99',
    image: '/images/cacaolat.png',
    category: '수입제품',
  },
];

const ProductPage = () => {
  const [selectedTab, setSelectedTab] = useState('전체');
  const [currentSlide, setCurrentSlide] = useState(0);
  const filtered = selectedTab === '전체' ? products : products.filter(p => p.category === selectedTab);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % (bestProducts.length - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="product-container">
      <Header />

      <h1 className="best-title">Best</h1>

      <div className="carousel-multi">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 20}%)` }}
        >
          {bestProducts.map((product, index) => (
            <div key={index} className="carousel-card">
              <img src={product.image} alt={product.name} />
              <p className="carousel-name">{product.name}</p>
              <p className="carousel-price">{product.price}</p>
            </div>
          ))}
        </div>

        <div className="carousel-buttons">
          {Array.from({ length: bestProducts.length - 2 }).map((_, i) => (
            <button
              key={i}
              className={i === currentSlide ? 'active' : ''}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
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

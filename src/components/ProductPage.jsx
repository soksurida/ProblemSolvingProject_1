import React, { useState } from 'react';
import './ProductPage.css';
import Header from './Header';
import { FaChevronDown } from 'react-icons/fa';

const products = [
  { name: '네스퀵 초콜릿 드링크 180ml', price: '1,200원', image: '/images/nesquik.png', category: '국내제품' },
  { name: '허쉬 초콜릿 드링크 235ml', price: '1,200원', image: '/images/hershey.png', category: '해외제품' },
  { name: '연세우유 마카다미아 초코우유 190ml', price: '1,600원', image: 'images/y.png', category: '국내제품' },
  { name: '서울우유 초콜릿 300ml', price: '1,650원', image: '/images/seoulmilk.jpg', category: '국내제품' },
  { name: '초코 바나나킥 우유 300ml', price: '1,500원', image: '/images/kick.png', category: '국내제품' },
  { name: '덴마크 민트초코우유 310ml', price: '1,500원', image: '/images/denmark.png', category: '국내제품' },
  { name: '남양유업 초코에몽 190ml', price: '1,600원', image: '/images/mong.png', category: '국내제품' },
  { name: '빙그레 왕실초코 190ml', price: '1,400원', image: '/images/bingrae2.png', category: '국내제품' },
  { name: '빙그레 설탕이 들어가지 않은 초코우유 190ml', price: '1,000원', image: '/images/binggrae.png', category: '국내제품' },
  { name: '상하목장 유기농 멸균 우유 코코아', price: '1,000원', image: '/images/sangha.png', category: '국내제품' },
  { name: '고디바 다크 초콜릿 코코아 믹스 410g', price: '35,000원', image: '/images/godiba.png', category: '해외제품' },
  { name: '카카오랏 오리지널 200ml', price: '2,500원', image: '/images/cacaolat.png', category: '해외제품' },
  { name: 'Promised Land Midnight Chocolate Whole Milk', price: '7,000원', image: '/images/promised.png', category: '해외제품' },
  { name: '일동후디스 앤업카페 초코라떼텀블러 300ml', price: '2,300원', image: '/images/&up.png', category: '국내제품' },
  { name: 'Lindt Hot Chocolate Frakes 210g', price: '20,000원', image: '/images/lindt.png', category: '해외제품' },
  { name: 'Horizon Organic Lowfat Chocolate Milk 236ml', price: '5,000원', image: '/images/horizon.png', category: '해외제품' },
  { name: '이토엔 치치야스 밀크 코코아 200ml', price: '2,500원', image: '/images/chi.png', category: '해외제품' },
  { name: '스위스미스 마시멜로 핫코코아 믹스 280g', price: '5,500원', image: '/images/swiss.png', category: '해외제품' },
  { name: '서울우유 너티초코 300ml', price: '1,500원', image: '/images/seoulnutty.png', category: '국내제품' },
  { name: '모리나가 밀크 코코아 500ml', price: '4,000원', image: '/images/mori.png', category: '해외제품' },
  { name: '춘식이 초코우유 500ml', price: '2,000원', image: '/images/chun.png', category: '국내제품' }
];

const ProductPage = () => {
  const [selectedTab, setSelectedTab] = useState('전체');
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('인기순');

  const handleSortClick = () => {
    setSortOpen(prev => !prev);
  };

  const handleSortSelect = (sort) => {
    setSelectedSort(sort);
    setSortOpen(false);
  };

  // 가격 문자열에서 숫자만 추출하여 정렬 기준으로 사용
  const parsePrice = (priceStr) => {
    const numeric = priceStr.replace(/[^\d.]/g, '');
    return parseFloat(numeric);
  };

  const filtered = selectedTab === '전체'
    ? products
    : products.filter(p => p.category === selectedTab);

  const sorted = [...filtered];
  if (selectedSort === '높은 가격순') {
    sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (selectedSort === '낮은 가격순') {
    sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  }

  return (
    <div className="product-page-wrapper">
      <Header />

      <div className="product-main">
        {/* 좌측 필터 */}
        <aside className="product-sidebar">
          <h2 className="sidebar-title">제품</h2>
          <ul className="filter-list">
            {['전체', '국내제품', '해외제품'].map(tab => (
              <li
                key={tab}
                className={selectedTab === tab ? 'filter-item active' : 'filter-item'}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </aside>

        {/* 우측 상품 목록 */}
        <section className="product-section">
          <div className="product-topbar">
            <p className="product-count">총 {sorted.length}개의 상품이 있습니다.</p>

            <div className="sort-wrapper" onClick={handleSortClick}>
              <span className="sort-label">{selectedSort}</span>
              <FaChevronDown className={`sort-icon ${sortOpen ? 'rotated' : ''}`} />

              {sortOpen && (
                <ul className="sort-dropdown">
                  {['인기순', '높은 가격순', '낮은 가격순'].map((option, index) => (
                    <li
                      key={index}
                      className={selectedSort === option ? 'selected-option' : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSortSelect(option);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="product-grid">
            {sorted.map((product, index) => (
              <div key={index} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;

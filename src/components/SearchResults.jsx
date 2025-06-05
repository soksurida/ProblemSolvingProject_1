import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';
import { FaChevronDown } from 'react-icons/fa';
import Header from './Header';

const products = [
  { id: 1, name: '네스퀵 초콜릿 드링크 180ml', price: '1,200원', image: '/images/nesquik.png', category: '국내제품' },
  { id: 2, name: '허쉬 초콜릿 드링크 235ml', price: '1,200원', image: '/images/hershey.png', category: '해외제품' },
  { id: 3, name: '연세우유 마카다미아 초코우유 190ml', price: '1,600원', image: 'images/y.png', category: '국내제품' },
  { id: 4, name: '서울우유 초콜릿 300ml', price: '1,650원', image: '/images/seoulmilk.jpg', category: '국내제품' },
  { id: 5, name: '초코 바나나킥 우유 300ml', price: '1,500원', image: '/images/kick.png', category: '국내제품' },
  { id: 6, name: '덴마크 민트초코우유 310ml', price: '1,500원', image: '/images/denmark.png', category: '국내제품' },
  { id: 7, name: '남양유업 초코에몽 190ml', price: '1,600원', image: '/images/mong.png', category: '국내제품' },
  { id: 8, name: '빙그레 왕실초코 190ml', price: '1,400원', image: '/images/bingrae2.png', category: '국내제품' },
  { id: 9, name: '빙그레 설탕이 들어가지 않은 초코우유 190ml', price: '1,000원', image: '/images/binggrae.png', category: '국내제품' },
  { id: 10, name: '상하목장 유기농 멸균 우유 코코아', price: '1,000원', image: '/images/sangha.png', category: '국내제품' },
  { id: 11, name: '고디바 다크 초콜릿 코코아 믹스 410g', price: '35,000원', image: '/images/godiba.png', category: '해외제품' },
  { id: 12, name: '카카오랏 오리지널 200ml', price: '2,500원', image: '/images/cacaolat.png', category: '해외제품' },
  { id: 13, name: 'Promised Land Midnight Chocolate Whole Milk', price: '7,000원', image: '/images/promised.png', category: '해외제품' },
  { id: 14, name: '일동후디스 앤업카페 초코라떼텀블러 300ml', price: '2,300원', image: '/images/&up.png', category: '국내제품' },
  { id: 15, name: 'Lindt Hot Chocolate Frakes 210g', price: '20,000원', image: '/images/lindt.png', category: '해외제품' },
  { id: 16, name: 'Horizon Organic Lowfat Chocolate Milk 236ml', price: '5,000원', image: '/images/horizon.png', category: '해외제품' },
  { id: 17, name: '이토엔 치치야스 밀크 코코아 200ml', price: '2,500원', image: '/images/chi.png', category: '해외제품' },
  { id: 18, name: '스위스미스 마시멜로 핫코코아 믹스 280g', price: '5,500원', image: '/images/swiss.png', category: '해외제품' },
  { id: 19, name: '서울우유 너티초코 300ml', price: '1,500원', image: '/images/seoulnutty.png', category: '국내제품' },
  { id: 20, name: '모리나가 밀크 코코아 500ml', price: '4,000원', image: '/images/mori.png', category: '해외제품' },
  { id: 21, name: '춘식이 초코우유 500ml', price: '2,000원', image: '/images/chun.png', category: '국내제품' }
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get('q') || '';

  const [selectedSort, setSelectedSort] = useState('인기순');
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    if (keyword) {
      const stored = JSON.parse(localStorage.getItem('recentKeywords')) || [];
      const updated = [keyword, ...stored.filter(k => k !== keyword)].slice(0, 5);
      localStorage.setItem('recentKeywords', JSON.stringify(updated));
    }
  }, [keyword]);

  const handleSortClick = () => setSortOpen(!sortOpen);
  const handleSortSelect = (sort) => {
    setSelectedSort(sort);
    setSortOpen(false);
  };

  const parsePrice = (priceStr) => parseFloat(priceStr.replace(/[^\d.]/g, ''));

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const sortedProducts = [...filteredProducts];
  if (selectedSort === '높은 가격순') {
    sortedProducts.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (selectedSort === '낮은 가격순') {
    sortedProducts.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  }

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <Header />
      <div className="search-results-wrapper">
        <div className="search-results-header-row">
          <div className="search-header-center">
            <h2 className="search-results-title">'{keyword}'</h2>
            <p className="search-results-sub">총 {sortedProducts.length}개의 검색 결과입니다.</p>
          </div>
          <div className="search-sort-bar">
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
        </div>

        <div className="search-grid">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="search-card"
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
              <img src={product.image} alt={product.name} className="search-image" />
              <p className="search-name">{product.name}</p>
              <p className="search-price">{product.price}</p>
            </div>
          ))}

          {sortedProducts.length === 0 && (
            <p className="no-results">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
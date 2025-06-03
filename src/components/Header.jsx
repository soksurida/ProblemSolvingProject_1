import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [recentKeywords, setRecentKeywords] = useState([]);

  const toggleSearch = () => {
    setShowSearch(true);
  };

  const closeSearch = () => {
    setShowSearch(false);
  };

  const handleSearch = () => {
    if (searchValue.trim() === '') return;
    if (!recentKeywords.includes(searchValue)) {
      setRecentKeywords([searchValue, ...recentKeywords]);
    }
    alert(`'${searchValue}' 검색됨!`);
    setSearchValue('');
  };

  // ✅ 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = showSearch ? 'hidden' : 'auto';
  }, [showSearch]);

  return (
    <>
      {/* ✅ 고정된 상단바 */}
      <header className="navbar">
        <span className="logo" onClick={() => (window.location.href = '/')} style={{ cursor: 'pointer' }}>
          Choco House
        </span>

        <nav className="nav-center">
          <span onClick={() => (window.location.href = '/product')}>Product</span>
          <span onClick={() => (window.location.href = '/getyourchoco')}>Get Your Choco</span>
          <span onClick={() => (window.location.href = '/community')}>Community</span>
          <span onClick={() => (window.location.href = '/brand')}>Brand</span>
        </nav>

        <div className="nav-icon-group">
          <img src="/images/search-icon.png" alt="Search" className="icon-img" onClick={toggleSearch} />
          <img src="/images/cart-icon.png" alt="Cart" className="icon-img" onClick={() => (window.location.href = '/cart')} />
          <img src="/images/login-icon.png" alt="Login" className="login-icon" onClick={() => (window.location.href = '/login')} />
        </div>
      </header>

      {/* ✅ 상단바 아래에서 슬라이드로 등장/사라지는 검색창 */}
      <div className={`search-popup-fixed ${showSearch ? 'show' : 'hide'}`}>
        <div className="search-popup-inner">
          <div className="search-header-row">
            <input
              type="text"
              className="overlay-search-input"
              placeholder="검색어를 입력하세요."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <img
              src="/images/search-icon.png"
              alt="검색"
              className="overlay-search-icon"
              onClick={handleSearch}
            />
            <button className="close-btn" onClick={closeSearch}>✕</button>
          </div>

{/* 인기 / 최근 검색어 */}
<div className="search-box-layout">
  <div className="search-section popular-keywords">
    <h3>인기 검색어</h3>
    <ul>
      {['초코우유', '더 진한', '서울', '네스퀵', '연세', '베스킨라빈스', '멸균우유', '해외', '국내', '너티'].map((word, index) => (
        <li key={index}><span className="rank">{index + 1}</span> {word}</li>
      ))}
    </ul>
  </div>

  <div className="search-section recent-keywords">
    <div className="recent-header-row">
      <h3>최근 검색어</h3>
      <button className="clear-all-btn" onClick={() => setRecentKeywords([])}>전체삭제</button>
    </div>

    <ul>
  {recentKeywords.map((word, index) => (
    <li key={index}>
      <span className="recent-word">{word}</span>
      <button
        className="remove-btn"
        onClick={() =>
          setRecentKeywords(recentKeywords.filter((_, i) => i !== index))
        }
      >
        ✕
      </button>
    </li>
  ))}
</ul>

    {recentKeywords.length === 0 && (
      <p className="empty">최근 검색어가 없습니다.</p>
    )}
  </div>
</div>
</div>
</div>
</>
);
}

export default Header;
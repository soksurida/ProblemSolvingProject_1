import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [recentKeywords, setRecentKeywords] = useState([]);

  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch(true);
  };

  const closeSearch = () => {
    setShowSearch(false);
  };

  const handleSearch = (keywordParam) => {
    const keyword = keywordParam || searchValue.trim();
    if (keyword === '') return;

    if (!recentKeywords.includes(keyword)) {
      const updated = [keyword, ...recentKeywords].slice(0, 5);
      setRecentKeywords(updated);
      localStorage.setItem('recentKeywords', JSON.stringify(updated));
    }

    setSearchValue('');
    setShowSearch(false);
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentKeywords')) || [];
    setRecentKeywords(stored);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSearch ? 'hidden' : 'auto';
  }, [showSearch]);

  return (
    <>
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

      <div className={`search-popup-fixed ${showSearch ? 'show' : 'hide'}`}>
        <div className="search-popup-inner">
          <div className="search-header-row">
            <input
              type="text"
              className="overlay-search-input"
              placeholder="검색어를 입력하세요."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <img
              src="/images/search-icon.png"
              alt="검색"
              className="overlay-search-icon"
              onClick={() => handleSearch()}
            />
            <button className="close-btn" onClick={closeSearch}>✕</button>
          </div>

          <div className="search-box-layout">
            <div className="search-section popular-keywords">
              <h3>인기 검색어</h3>
              <ul>
                {['초코우유', '더 진한', '서울', '네스퀵', '연세', '베스킨라빈스', '멸균우유', '해외', '국내', '너티'].map((word, index) => (
                  <li key={index} onClick={() => handleSearch(word)} style={{ cursor: 'pointer' }}>
                    <span className="rank">{index + 1}</span> {word}
                  </li>
                ))}
              </ul>
            </div>

            <div className="search-section recent-keywords">
              <div className="recent-header-row">
                <h3>최근 검색어</h3>
                <button className="clear-all-btn" onClick={() => {
                  setRecentKeywords([]);
                  localStorage.removeItem('recentKeywords');
                }}>전체삭제</button>
              </div>

              <ul>
                {recentKeywords.map((word, index) => (
                  <li
                    key={index}
                    onClick={() => handleSearch(word)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="recent-word">{word}</span>
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = recentKeywords.filter((_, i) => i !== index);
                        setRecentKeywords(updated);
                        localStorage.setItem('recentKeywords', JSON.stringify(updated));
                      }}
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

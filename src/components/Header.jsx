import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const closeSearch = () => {
    setShowSearch(false);
  };

  return (
    <>
      <header className="navbar">
        <Link to="/" className="logo">Choco House</Link>

        <nav className="nav-center">
          <Link to="/product"><span>Product</span></Link>
          <Link to="/getyourchoco"><span>Get Your Choco</span></Link>
          <Link to="/community"><span>Community</span></Link>
          <Link to="/brand"><span>Brand</span></Link>
        </nav>

        <div className="nav-icon-group">
          <img
            src="/images/search-icon.png"
            alt="Search"
            className="icon-img"
            onClick={toggleSearch}
            style={{ cursor: 'pointer' }}
          />
          <Link to="/cart"><img src="/images/cart-icon.png" alt="Cart" className="icon-img" /></Link>
          <Link to="/login"><img src="/images/login-icon.png" alt="Login" className="login-icon" /></Link>
        </div>
      </header>

      {/* 팝업처럼 겹쳐지는 검색창 */}
      {showSearch && (
        <div className="search-popup">
          <div className="search-popup-inner">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={() => alert(`'${searchValue}' 검색됨!`)}>검색</button>
            <button className="close-btn" onClick={closeSearch}>✕</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;

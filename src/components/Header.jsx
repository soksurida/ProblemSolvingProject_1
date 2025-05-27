import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">Choco House</Link>

      <nav className="nav-center">
        <Link to="/product"><span>Product</span></Link>
        <Link to="/getyourchoco"><span>Get Your Choco</span></Link>
        <Link to="/community"><span>Community</span></Link>
        <Link to="/brand"><span>Brand</span></Link>
      </nav>

      <div className="nav-icon-group">
        {/* 🔍 Link → 일반 img 클릭으로 변경 */}
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

      {/* 검색창 */}
      {showSearch && (
        <div className="search-box">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={() => alert(`'${searchValue}' 검색됨!`)}>검색</button>
        </div>
      )}
    </header>
  );
}

export default Header;

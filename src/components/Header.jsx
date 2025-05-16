import React from 'react';
import './Header.css';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'; // 얇은 선 아이콘

function Header() {
  return (
    <header className="navbar">
        <div className="logo">Choco House</div>

        <nav className="nav-center">
          <span>Product</span>
          <span>Get Your Choco</span>
          <span>Community</span>
          <span>Brand</span>
        </nav>

        <div className="nav-icon-group">
          <img src="/images/search-icon.png" alt="Search" className="icon-img" />
          <img src="/images/cart-icon.png" alt="Cart" className="icon-img" />
          <img src="/images/login-icon.png" alt="Login" className="login-icon" />
        </div>
    </header>
  );
}

export default Header;
import React from 'react';
import './Header.css';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'; // 얇은 선 아이콘
import { Link } from 'react-router-dom';

function Header() {
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
          <Link to="/search"><img src="/images/search-icon.png" alt="Search" className="icon-img" /></Link>
          <Link to="/cart"><img src="/images/cart-icon.png" alt="Cart" className="icon-img" /></Link>
          <Link to="/login"><img src="/images/login-icon.png" alt="Login" className="login-icon" /></Link>
        </div>
    </header>
  );
}

export default Header; 
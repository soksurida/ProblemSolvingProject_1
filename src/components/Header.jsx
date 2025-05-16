import React from 'react';
import './Header.css';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'; // 얇은 선 아이콘

function Header() {
  return (
    <header className="header">
      <div className="logo">Choco House</div>

      <nav className="nav">
        <a href="#">Product</a>
        <a href="#">Get your Choco</a>
        <a href="#">Brand</a>
        <a href="#">Community</a>
      </nav>

      <div className="icons">
        <FiSearch />
        <FiShoppingCart />
        <FiUser />
      </div>
    </header>
  );
}

export default Header;
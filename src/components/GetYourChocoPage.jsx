import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetYourChocoPage.css';

function GetYourChocoPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dotCount, setDotCount] = useState(0);

  const handlePlay = () => {
    setIsLoading(true); 
  };

  useEffect(() => {
    let interval;
    let timeout;

    if (isLoading) {
      // 점 찍는 인터벌
      interval = setInterval(() => {
        setDotCount((prev) => (prev + 1) % 4); // 0~3 반복
      }, 600); // 점 하나씩 0.5초마다 찍기

      // 2.4초 후 이동 (0.6초 × 4 = 2.4초)
      timeout = setTimeout(() => {
        navigate('/start');
      }, 2400); // ✅ 2.4초로 딜레이 늘림
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isLoading, navigate]);

  return (
    <div className="getyourchoco-page">
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

      {isLoading ? (
        <div className="loading-screen">
          <p>Loading{'.'.repeat(dotCount)}</p>
        </div>
      ) : (
        <div className="main-content">
          <h1 className="main-title">Get Your Choco</h1>
          <p className="sub-title">“ Find the chocolate milk that’s so you ”</p>
          <button className="play-button" onClick={handlePlay}>Play</button>
        </div>
      )}
    </div>
  );
}

export default GetYourChocoPage;
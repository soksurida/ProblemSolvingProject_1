import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetYourChocoPage.css';
import Header from './Header';

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
      <Header/>

      {isLoading ? (
        <div className="loading-screen">
          <p>Loading{'.'.repeat(dotCount)}</p>
        </div>
      ) : (
        <div className="main-content">
          <h1 className="main-title">Get Your Choco</h1>
          <p className="sub-title">“ 당신의 취향을 담은 초코우유, 지금 찾아보세요 ”</p>
          <button className="play-button" onClick={handlePlay}>Play</button>
        </div>
      )}

    </div>
  );
}

export default GetYourChocoPage;
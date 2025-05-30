import React, { useState, useRef } from 'react';
import './HeroVideo.css';
import { Link } from 'react-router-dom';

const HeroVideo = () => {
  const [showMenu, setShowMenu] = useState(false);
  const timeoutRef = useRef(null); // 👈 딜레이 타이머 저장용

  const videoList = [
    '/videos/choco.mp4',
    '/videos/choco2.mp4',
    '/videos/choco3.mp4'
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % videoList.length);
  }; 

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current); // 마우스 다시 들어오면 타이머 취소
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    // 마우스가 나가도 바로 닫지 않고 약간 대기
    timeoutRef.current = setTimeout(() => {
      setShowMenu(false);
    }, 200); // 0.2초 후 닫기 (필요시 더 늘려도 OK)
  };

  const branches = [
    { x1: 85, y1: 100, x2: 15, y2: 10, label: 'Product',        style: { top: '-40px',   left: '-70px' } },
    { x1: 290, y1: 100, x2: 360, y2: 10, label: 'Get your choco',        style: { top: '-40px',   right:'-90px' } },
    { x1: 85, y1: 275, x2: 15, y2: 365, label: 'Community', style: { bottom:'-40px',  left: '-60px' } },
    { x1: 290, y1: 275, x2: 360, y2: 365, label: 'Brand',         style: { bottom:'-40px',  right:'-50px' } },
  ];

  return (
    <div className="video-container">
      <video
        key={currentIndex} // 재렌더링 강제
        className="background-video"
        src={videoList[currentIndex]}
        autoPlay
        loop
        muted
        playsInline
        onEnded={handleVideoEnded}
      />

      {showMenu && <div className="backdrop" />}

      <div
        className="center-overlay"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="menu-wrapper">
          
            <svg className="svg-lines" viewBox="0 0 375 375">
              {branches.map((b, i) => (
                <line
                  key={i}
                  className={`animated-line ${showMenu ? 'line-visible' : ''}`}
                  x1={b.x1}
                  y1={b.y1}
                  x2={b.x2}
                  y2={b.y2}
                />
              ))}
            </svg>
          

          <div className="logo-core">
            <div className="logo-text">Choco House</div>
            <div className="logo-sub">달콤한 하루의 시작</div>
          </div>

          
          {branches.map((b, i) => (
              <div key={i} className={`menu-item ${showMenu ? 'fade-in' : ''}`} style={b.style}>
                {b.label === 'Product' ? (
                <Link to="/product" style={{ color: 'white', textDecoration: 'none' }}>
                  {b.label}
                </Link>
              ) : (
                b.label
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;

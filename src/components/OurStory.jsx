import React, { useState } from 'react';
import './OurStory.css';
import Header from './Header';
import chocoVideo from '../assets/Chocolate Milk Moments.mp4';
import kakaoImg from '../assets/kakao.png';
import namuImg from '../assets/namu.png';
import roastingImg from '../assets/roasting.png';
import milkImg from '../assets/milk.png';

const data = [
  {
    title: '엄선된 원유',
    image: kakaoImg,
    desc: `고급 브랜드가 자랑하는 청정 원유 사용\n`
  },
  {
    title: '다양한 카카오',
    image: namuImg,
    desc: `진한 맛, 부드러운 맛 모두 아우르는 셀렉션\n`
  },
  {
    title: '브랜드 셀렉션',
    image: roastingImg,
    desc: `엄격한 기준으로 선별한 믿을 수 있는 제품들`
  },
  {
    title: '취향별 큐레이션',
    image: milkImg,
    desc: `내 입맛에 맞는 초코우유를 쉽게 찾을 수 있도록 추천 기능 제공`
  }
];

export default function OurStory() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + data.length) % data.length);
  const next = () => setCurrent((current + 1) % data.length);

  return (
    <div className="our-story-page">
      <Header />

      <section className="hero-section">
        <video className="bg-video" autoPlay loop muted playsInline>
          <source src={chocoVideo} type="video/mp4" />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>
        <div className="overlay-text">
          <h1>CHOCOLATE MILK FROM THE HEART</h1>
          <p>초콜릿처럼 달콤하게<br />우유처럼 순수하게</p>
        </div>
      </section>

      <section className="story-reveal">
        <div className="curve-background"></div>
        <div className="story-section">
          <h2 className="story-title">우리가 초코우유를 만드는 방식</h2>
          <p className="story-desc">
            초코우유는 단순한 음료가 아닙니다.<br />
            하루의 끝, 당신의 휴식을 채우는 따뜻한 위로이자,<br />
            당신의 취향을 존중하는 달콤한 선택입니다.<br /><br />
            우리는 자연에서 온 원유와 정성껏 셀렉한 카카오 원두만을 사용해,<br />
            불필요한 것을 덜고 진짜만을 남깁니다.<br />
            한 모금마다 진심이 느껴지도록,<br />
            브랜드의 철학을 담아 한 잔을 완성합니다.
          </p>
        </div>
      </section>

      <section className="our-story-slider">
        <h2 className="our-story-title">한 잔에 담은 진심, 초콜릿의 품격</h2>
        <div className="slider-wrapper">
          <button className="arrow left" onClick={prev}>&#60;</button>
          <div className="our-cards">
            {data.map((item, index) => {
              let position = 'hidden';
              if (index === current) position = 'center';
              else if (index === (current - 1 + data.length) % data.length) position = 'left';
              else if (index === (current + 1) % data.length) position = 'right';
              return (
                <div className={`our-card ${position}`} key={index}>
                  <img src={item.image} alt={item.title} className="our-circle-img" />
                  <h3 className="our-card-title">{item.title}</h3>
                  <div className="our-card-desc">
                    {item.desc.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <button className="arrow right" onClick={next}>&#62;</button>
        </div>
      </section>

      <section className="info-section why">
        <h2>Why We Made This</h2>
        <p className="info-subtitle">초코우유를 사랑하는 모든 이들을 위해</p>
        <p>
          초코우유를 사랑하는 모두가 더 쉽게, 더 다양하게 즐길 수 있도록<br />
          Choco House를 만들었습니다.
        </p>
        <p>
          우리는 진한 맛, 부드러운 맛, 가볍고 깔끔한 맛까지 다양한 초코우유를 한 곳에 모아,<br />
          당신의 취향에 꼭 맞는 초코우유를 발견할 수 있도록 돕습니다.
        </p>
      </section>

      <section className="info-section promise">
        <h2>Our Promise</h2>
        <p className="info-subtitle">Variety. Quality. Delight.</p>
        <p>
          우리는 초코우유를 더욱 특별하게 즐길 수 있는 방법을 제안합니다.<br />
          Choco House는 늘 새롭고 신뢰할 수 있는 초코우유를 소개하며,<br />
          당신의 일상에 달콤한 즐거움을 더하겠습니다.
        </p>
      </section>

      {/* ✅ 마무리 섹션 */}
      <section className="closing-section">
        <h2>Thank You for Visiting</h2>
        <p>
          초코우유를 넘어, 당신의 하루에 작은 위로와 즐거움을 전하고 싶습니다.<br />
          Choco House는 앞으로도 진심을 담은 한 잔을 만들겠습니다.
        </p>
        <p className="signature">From. Choco House Team</p>
      </section>
    </div>
  );
}

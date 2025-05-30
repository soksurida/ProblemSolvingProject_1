import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import resultData from '../resultData';
import './ResultPage.css';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultType } = location.state || {};

  const result = resultData[resultType];

  const handleRestart = () => {
    navigate('/start'); // ✅ 수정: 다시 테스트할 때 /start로 이동
  };

  if (!result) {
    return (
      <div className="result-page">
        <h1 className="intro-text">　테스트 결과 🎉</h1>
        <p className="result-description">결과를 불러올 수 없습니다.</p>
        <div className="button-group">
          <button className="button" onClick={handleRestart}>다시 테스트하기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="result-page">
      <div className="result-header">
        <h1 className="intro-text">　테스트 결과 🎉</h1>
        <h2 className="result-type">{resultType}</h2>
      </div>

      <p className="result-description">{result.description}</p>

      <img src={result.image} alt={resultType} className="result-image" />

      <div className="button-group">
        <button className="button" onClick={handleRestart}>다시 테스트하기</button>
        <button
          className="button secondary"
          onClick={() => window.location.href = '/'}
        >
          나만의 초코우유 사러 가기
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
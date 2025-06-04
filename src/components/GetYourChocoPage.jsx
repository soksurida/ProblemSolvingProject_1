// ✅ GetYourChocoPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questionData from '../QuestionData';
import resultData from '../resultData';
import './GetYourChocoPage.css';
import Header from './Header';

function GetYourChocoPage() {
  const [stage, setStage] = useState('intro');
  const [dotCount, setDotCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [finalType, setFinalType] = useState(null);

  const navigate = useNavigate();

  const typeToProductId = {
    "Velvet Noir": 11,
    "Creamy Muse": 1,
    "Choco Minimalist": 4,
    "Milky Dreamer": 2,
    "Espresso Bitter": 15,
    "Fruity Spark": 5,
    "Caramel Hug": 8,
    "Cold Brew Choco": 14,
    "Nutty Realist": 19,
    "Silken Balance": 10,
    "Sweet Harmony": 7,
    "Hidden Spice": 11,
    "Marshmallow Soul": 18,
    "Nightfall Dark": 13,
    "No Sugar Please": 9,
    "Choco Artist": 6
  };

  const handlePlay = () => setStage('loading');

  useEffect(() => {
    let interval, timeout;
    if (stage === 'loading') {
      interval = setInterval(() => setDotCount(prev => (prev + 1) % 4), 600);
      timeout = setTimeout(() => setStage('test'), 2400);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [stage]);

  const handleAnswerClick = (type) => {
    const nextSelectedAnswers = [...selectedAnswers, type];
    if (currentQuestionIndex + 1 < questionData.length) {
      setSelectedAnswers(nextSelectedAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const result = calculateResult(nextSelectedAnswers);
      setFinalType(result);
      setStage('result');
    }
  };

  const calculateResult = (answers) => {
    const scoreMap = {};
    answers.forEach((type) => {
      scoreMap[type] = (scoreMap[type] || 0) + 1;
    });
    const maxScore = Math.max(...Object.values(scoreMap));
    const topTypes = Object.entries(scoreMap)
      .filter(([_, score]) => score === maxScore)
      .map(([type]) => type);
    return topTypes[Math.floor(Math.random() * topTypes.length)];
  };

  const handleRestart = () => {
    window.location.href = '/getyourchoco';
  };

  const handleGoToProduct = () => {
    const productId = typeToProductId[finalType];
    if (productId) {
      navigate(`/product/${productId}`);
    } else {
      navigate('/product');
    }
  };

  const handleShare = () => {
    const shareText = `나의 초코우유 유형은 "${finalType}"! 🍫\n\n${resultData[finalType].description}`;
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: '나의 초코우유 테스트 결과',
        text: shareText,
        url: shareUrl
      }).catch((err) => console.log('공유 실패:', err));
    } else {
      alert('이 결과를 복사해서 친구들과 공유하세요!\n\n' + shareText);
    }
  };

  const currentQuestion = questionData[currentQuestionIndex];
  const progress = (currentQuestionIndex / questionData.length) * 100;

  return (
    <div className="getyourchoco-page">
      <Header />
      {stage === 'intro' && (
        <div className="main-content">
          <h1 className="main-title">Get Your Choco</h1>
          <p className="sub-title">“ 당신의 취향을 담은 초코우유, 지금 찾아보세요 ”</p>
          <button className="play-button" onClick={handlePlay}>Play</button>
        </div>
      )}
      {stage === 'loading' && (
        <div className="loading-screen">
          <p>Loading{'.'.repeat(dotCount)}</p>
        </div>
      )}
      {stage === 'test' && currentQuestion && (
        <div className="test-screen">
          <h1>초코우유 유형 테스트🍫</h1>
          <h2 className="question-title">{currentQuestion.question}</h2>
          <div className="progress-bar-outer">
            <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="answers">
            {currentQuestion.answers.map((answer, idx) => (
              <button key={idx} className="answer-button" onClick={() => handleAnswerClick(answer.type)}>
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}
      {stage === 'result' && finalType && (
        <div className="result-page">
          <div className="result-header">
            <h1 className="intro-text">　테스트 결과 🎉</h1>
            <h2 className="result-type">{finalType}</h2>
          </div>
          <p className="result-description">{resultData[finalType].description}</p>
          <img src={resultData[finalType].image} alt={finalType} className="result-image" />
          <div className="button-group">
            <button className="button" onClick={handleRestart}>다시 테스트하기</button>
            <button className="button secondary" onClick={handleGoToProduct}>나만의 초코우유 사러 가기</button>
          </div>
          <div className="share-section">
            <button className="share-button" onClick={handleShare}>결과 공유하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetYourChocoPage;

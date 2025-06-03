/* GetYourChocoPage.jsx */
import React, { useState, useEffect } from 'react';
import questionData from '../QuestionData';
import resultData from '../resultData';
import './GetYourChocoPage.css';
import Header from './Header';

function GetYourChocoPage() {
  const [stage, setStage] = useState('intro'); // intro, loading, test, result
  const [dotCount, setDotCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [finalType, setFinalType] = useState(null);

  const handlePlay = () => {
    setStage('loading');
  };

  useEffect(() => {
    let interval;
    let timeout;

    if (stage === 'loading') {
      interval = setInterval(() => {
        setDotCount((prev) => (prev + 1) % 4);
      }, 600);

      timeout = setTimeout(() => {
        setStage('test');
      }, 2400);
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
    answers.forEach((answerTypes) => {
      answerTypes.forEach((type) => {
        scoreMap[type] = (scoreMap[type] || 0) + 1;
      });
    });
    const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : null;
  };

  // ✅ 새로고침 포함하여 GetYourChoco 첫 화면으로
  const handleRestart = () => {
    window.location.href = '/getyourchoco';
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

      {stage === 'test' && (
        <div className="test-screen">
          <h1>초코우유 유형 테스트🍫</h1>
          {currentQuestion && (
            <>
              <h2 className="question-title">{currentQuestion.question}</h2>
              <div className="progress-bar-outer">
                <div
                  className="progress-bar-inner"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="answers">
                {currentQuestion.answers.map((answer, idx) => (
                  <button
                    key={idx}
                    className="answer-button"
                    onClick={() => handleAnswerClick(answer.type)}
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
            </>
          )}
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
            <button className="button secondary" onClick={() => window.location.href = '/'}>
              나만의 초코우유 사러 가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetYourChocoPage;

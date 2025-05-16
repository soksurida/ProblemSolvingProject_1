import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questionData from '../QuestionData';
import './QuestionPage.css';

function QuestionPage() {
  const [start, setStart] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswerClick = (type) => {
    const nextSelectedAnswers = [...selectedAnswers, type];

    if (currentQuestionIndex + 1 < questionData.length) {
      setSelectedAnswers(nextSelectedAnswers);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalType = calculateResult(nextSelectedAnswers);
      navigate('/result', { state: { resultType: finalType } });
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

  const currentQuestion = questionData[currentQuestionIndex];
  const progress = (currentQuestionIndex / questionData.length) * 100;

  return (
    <div className="question-page">
      {/* ✅ 로고와 인트로를 하나로 묶기 */}
      {!start ? (
        <div className="intro-wrapper">
          <div className="logo-text">Choco House</div>
          <div className="start-screen">
            <h1>✨ 나만의 초코우유 유형 테스트 ✨</h1>
            <p>초코우유 취향 속에 숨겨진 내 성격은?</p>
            <p>당신에게 꼭 맞는 초코우유를 찾아드려요!🍫🥛</p>
            <button className="start-button" onClick={() => setStart(true)}>Start</button>
          </div>
        </div>
      ) : (
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
    </div>
  );
}

export default QuestionPage;
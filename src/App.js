import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';
import GetYourChocoPage from './components/GetYourChocoPage'; // ✅ 추가

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인 홈페이지: Get Your Choco 화면 */}
        <Route path="/" element={<GetYourChocoPage />} />
        
        {/* 테스트 시작 화면 */}
        <Route path="/start" element={<QuestionPage />} />

        {/* 테스트 결과 화면 */}
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
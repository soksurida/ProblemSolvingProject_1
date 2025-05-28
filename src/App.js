import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroVideo from './components/HeroVideo';
import ProductPage from './components/ProductPage';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';
import GetYourChocoPage from './components/GetYourChocoPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import OurStory from './components/OurStory';
import Community from './components/Community'; // ✅ 남겨둬야 하는 부분

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroVideo />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/getyourchoco" element={<GetYourChocoPage />} />
        <Route path="/start" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/brand" element={<OurStory />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;

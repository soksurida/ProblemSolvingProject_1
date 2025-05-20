import React from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // ✅ 1. Header import

function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header /> {/* ✅ 2. Header 컴포넌트 추가 */}

      <div className="login-page">
        <h2 className="login-title">로그인</h2>

        <div className="login-box">
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" placeholder="아이디" />

          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호" />

          <button className="login-button">Sign In</button>

          <div className="forgot-password">
            <a href="#">비밀번호를 잊어버리셨나요?</a>
          </div>
        </div>

        <div className="join-box">
          <span>아직 회원이 아니세요?</span>
          <button className="join-button" onClick={() => navigate('/signup')}>
            회원가입
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

// src/components/SignupPage.jsx
import React from 'react';
import './SignupPage.css';
import Header from './Header';

function SignupPage() {
  return (
    <>
     <Header />

     <div className="signup-wrapper">
       <div className="signup-container">
         <h2>회원가입</h2>
         <form className="signup-form">
           <label>이름 <span className="required">*</span></label>
           <input type="text" placeholder="이름" />

           <label>휴대전화 <span className="required">*</span></label>
           <input type="text" placeholder="010-1234-5678" />

           <label>Email address <span className="required">*</span></label>
           <input type="email" placeholder="email@domain.com" />

           <label>아이디 <span className="required">*</span></label>
           <input type="text" placeholder="영문/숫자(4~16자)" />

           <label>비밀번호 <span className="required">*</span></label>
           <input type="password" placeholder="영문/숫자(4~16자)" />

           <label>비밀번호 확인 <span className="required">*</span></label>
           <input type="password" placeholder="영문/숫자(4~16자)" />

           <label>주소 <span className="required">*</span></label>
           <input type="text" placeholder="우편번호" />
           <input type="text" placeholder="기본주소" />
           <input type="text" placeholder="나머지 주소 (선택 입력 가능)" />

           <button type="submit" className="submit-button">Submit</button>
         </form>
       </div>
     </div>
    </>
  );
}

export default SignupPage;
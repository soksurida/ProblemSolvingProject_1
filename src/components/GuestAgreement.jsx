import React, { useState } from 'react';
import './GuestAgreement.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom'; // ✅ 페이지 이동용

function GuestAgreement() {
  const navigate = useNavigate(); // ✅ useNavigate 훅
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    terms: false,
    privacy: false,
    delegate: false,
  });

  const handleAllCheck = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setCheckedItems({
      terms: newChecked,
      privacy: newChecked,
      delegate: newChecked,
    });
  };

  const handleCheck = (key) => {
    const updated = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updated);
    setAllChecked(Object.values(updated).every(Boolean));
  };

  const allAgreed = Object.values(checkedItems).every(Boolean);

  const handleAgree = () => {
    if (allAgreed) {
      navigate('/payment'); // ✅ 동의 시 결제 페이지로 이동
    }
  };

  return (
    <>
      <Header />
      <div className="guest-agreement-wrapper">
        <h2>비회원 구매 약관 동의</h2>
        <hr />

        <div className="checkbox-wrapper">
          <label>
            <input type="checkbox" checked={allChecked} onChange={handleAllCheck} />
            <strong>모든 약관 동의</strong>
            <span className="subtext">구매약관에 모두 동의하셔야 주문하실 수 있습니다.</span>
          </label>

          <label>
            <input type="checkbox" checked={checkedItems.terms} onChange={() => handleCheck('terms')} />
            비회원 구매 이용 약관 동의
            <span className="arrow">➔</span>
          </label>

          <label>
            <input type="checkbox" checked={checkedItems.privacy} onChange={() => handleCheck('privacy')} />
            개인정보 수집동의에 대한 동의
            <span className="arrow">➔</span>
          </label>

          <label>
            <input type="checkbox" checked={checkedItems.delegate} onChange={() => handleCheck('delegate')} />
            개인정보 처리 위탁에 대한 동의
            <span className="arrow">➔</span>
          </label>
        </div>

        <p className="info-text">※ 개인정보 처리 위탁에 대한 안내</p>

        <div className="button-group">
          <button className="cancel">동의 안함</button>
          <button className="agree" disabled={!allAgreed} onClick={handleAgree}>
            동의함
          </button>
        </div>
      </div>
    </>
  );
}

export default GuestAgreement;

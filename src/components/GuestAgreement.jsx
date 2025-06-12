import React, { useState } from 'react';
import './GuestAgreement.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function GuestAgreement() {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [visibleClause, setVisibleClause] = useState(null);
  const [checkedItems, setCheckedItems] = useState({
    terms: false,
    privacy: false
  });

  const handleAllCheck = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setCheckedItems({
      terms: newChecked,
      privacy: newChecked
    });
  };

  const handleCheck = (key) => {
    const updated = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updated);
    setAllChecked(Object.values(updated).every(Boolean));
  };

  const allAgreed = Object.values(checkedItems).every(Boolean);

  const handleAgree = () => {
    setCheckedItems({
      terms: true,
      privacy: true
    });
    setAllChecked(true);
    navigate('/payment');
  };

  return (
    <>
      <Header />
      <div className="guest-wrapper">
        <h2>비회원 구매 약관 동의</h2>
        <hr />

        <div className="guest-checkbox-wrapper">
          <label>
            <input type="checkbox" checked={allChecked} onChange={handleAllCheck} />
            <strong>모든 약관 동의</strong>
            <span className="guest-subtext">구매약관에 모두 동의하셔야 주문하실 수 있습니다.</span>
          </label>

          <label>
            <input type="checkbox" checked={checkedItems.terms} onChange={() => handleCheck('terms')} />
            비회원 구매 이용 약관 동의
            <span className="guest-arrow" onClick={() => setVisibleClause('terms')}>➔</span>
          </label>

          <label>
            <input type="checkbox" checked={checkedItems.privacy} onChange={() => handleCheck('privacy')} />
            개인정보 수집동의에 대한 동의
            <span className="guest-arrow" onClick={() => setVisibleClause('privacy')}>➔</span>
          </label>
        </div>

        <p className="guest-info-text">※ 개인정보 처리 위탁에 대한 안내는 별도 참조 바랍니다.</p>

        <div className="guest-button-group">
          <button className="guest-button-cancel">동의 안함</button>
          <button className="guest-button-agree" disabled={!allAgreed} onClick={handleAgree}>동의함</button>
        </div>

        {/* 개인정보 수집 동의 모달 */}
        {visibleClause === 'privacy' && (
          <div className="guest-modal-backdrop">
            <div className="guest-modal-content">
              <button className="guest-modal-close" onClick={() => setVisibleClause(null)}>&times;</button>
              <h2>개인정보 수집 동의</h2>
              <p>주식회사 초코하우스는 다음과 같이 서비스 제공을 위한 최소한의 이용자의 개인정보를 수집 및 이용하고 있습니다.</p>
              <table className="guest-agreement-table">
                <thead>
                  <tr>
                    <th>수집항목</th>
                    <th>수집이용목적</th>
                    <th>이용보유기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>주문자 및 물품수령인의 성명, 주문번호</td>
                    <td>서비스 이용에 따른 본인 식별절차에 이용, 불량회원의 부정한 이용 재발 방지</td>
                    <td rowSpan={3} className="guest-bold-cell">물품 또는 서비스가 인도되거나 제공될 때까지</td>
                  </tr>
                  <tr>
                    <td>전자우편주소, 배송주소, 휴대전화번호, 기타요구사항</td>
                    <td>공지사항 전달/본인 의사 확인/불만처리 등을 위한 의사소통 경로 확보, 물품배송</td>
                  </tr>
                  <tr>
                    <td>IP 주소, 방문일시</td>
                    <td>주문정보 확인</td>
                  </tr>
                  <tr>
                    <td>신용카드 종류, 카드번호, 유효기간</td>
                    <td rowSpan="2">대금결제</td>
                    <td rowSpan={2} className="guest-bold-cell">대금의 완제일 또는 채권소멸시효기간이 만료될 때까지</td>
                  </tr>
                  <tr>
                    <td>거래 은행명, 계좌번호, 거래자 성명</td>
                  </tr>
                </tbody>
              </table>
              <div className="guest-center-button">
                <button className="guest-button-agree" onClick={() => setVisibleClause(null)}>동의함</button>
              </div>
            </div>
          </div>
        )}

        {/* 비회원 구매 약관 동의 모달 */}
        {visibleClause === 'terms' && (
          <div className="guest-modal-backdrop">
            <div className="guest-modal-content">
              <button className="guest-modal-close" onClick={() => setVisibleClause(null)}>&times;</button>
              <h2>비회원 구매 이용 약관 동의</h2>

              <h3>제1조 (목적)</h3>
              <p>이 약관은 초코하우스(이하 "회사")가 제공하는 상품 및 서비스의 이용과 관련하여, 비회원의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.</p>

              <h3>제2조 (비회원의 서비스 이용)</h3>
              <ul>
                <li>비회원은 회사의 온라인 쇼핑몰에서 상품을 주문 및 결제할 수 있습니다.</li>
                <li>비회원은 상품 배송, 결제 처리, 고객 응대 등을 위한 최소한의 개인정보를 제공해야 합니다.</li>
                <li>일부 서비스는 회원 전용 혜택에서 제외될 수 있습니다.</li>
              </ul>

              <h3>제3조 (개인정보 수집 및 이용)</h3>
              <ul>
                <li>회사는 주문 처리 및 서비스 제공을 위해 필요한 범위 내에서 개인정보를 수집합니다.</li>
                <li>수집 항목: 이름, 연락처, 주소, 이메일, 결제정보 등</li>
                <li>이용 목적: 주문 확인, 배송 안내, 고객 응대 및 결제 처리 등</li>
                <li>보유 기간: 관련 법령에 따라 일정 기간 보관 후 안전하게 파기됩니다.</li>
              </ul>

              <h3>제4조 (환불 및 교환)</h3>
              <ul>
                <li>상품 수령 후 7일 이내 반품 또는 교환 요청이 가능합니다.</li>
                <li>단, 상품 훼손 또는 사용 흔적이 있는 경우에는 제한될 수 있습니다.</li>
              </ul>

              <h3>제5조 (면책 조항)</h3>
              <p>회사는 천재지변, 통신 장애, 시스템 오류 등 불가항력적인 사유로 인해 서비스 제공에 문제가 발생한 경우 책임을 지지 않습니다.</p>

              <h3>제6조 (약관 변경)</h3>
              <p>회사는 본 약관을 변경할 수 있으며, 변경된 내용은 사전 고지 후 즉시 효력을 가집니다.</p>

              <p className="guest-modal-contact">※ 문의: choco@chocohouse.com</p>

              <div className="guest-center-button">
                <button className="guest-button-agree" onClick={() => setVisibleClause(null)}>동의함</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default GuestAgreement;

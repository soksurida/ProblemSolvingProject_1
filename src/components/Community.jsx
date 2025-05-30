// Community.jsx
import React, { useState } from 'react';
import Header from './Header';
import './Community.css';

function Community() {
  const [activeTab, setActiveTab] = useState('공지사항');
  const [openIndex, setOpenIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderNotices = () => (
    <div className="accordion">
      {[...Array(3)].map((_, i) => (
        <div className="accordion-item" key={i}>
          <div className="accordion-header" onClick={() => toggleAccordion(i)}>
            Choco House 제품내 외국산 원산지 공지
            <span className="arrow">{openIndex === i ? '▲' : '▼'}</span>
          </div>
          {openIndex === i && (
            <div className="accordion-body">
              관련 내용이 여기에 표시됩니다. 실제 운영 시 DB에서 받아옵니다.
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderFAQs = () => (
    <div className="faq-list">
      {faqData.map((item, index) => (
        <div
          className="faq-box"
          key={index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <div className="faq-question">Q. {item.question}</div>
          {openIndex === index && (
            <div className="faq-answer">A. {item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );

  const renderInquiryForm = () => (
    <div className="inquiry-form">
      <h3>고객 기본정보</h3>

      <div className="checkbox-section">
        <p className="small-title">개인정보 수집 및 보유 동의</p>
        <table className="consent-table">
          <thead>
            <tr><th>수집항목</th><th>수집목적</th><th>보유기간</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>이름, 연락처, 이메일</td>
              <td>고객문의 접수 및 처리 결과 회신</td>
              <td>문의 접수일로부터 3년</td>
            </tr>
          </tbody>
        </table>
        <label className="agree-check">
          <input type="radio" name="agree" /> 동의
        </label>
        <label className="agree-check">
          <input type="radio" name="agree" /> 동의하지 않음
        </label>
        <p className="consent-warning">
          고객님께서는 개인정보 수집 및 보유에 대한 동의를 거부할 권리가 있습니다.
          동의하지 않을 경우 고객상담처리 완료안내나 내용의 답변을 드릴 수 없습니다.
        </p>
      </div>

      <form>
        <input type="text" placeholder="이름" required />
        <input type="tel" placeholder="연락처" required />
        <input type="text" placeholder="주소" />
        <input type="text" placeholder="우편번호" />
        <input type="text" placeholder="기본주소" />
        <input type="text" placeholder="나머지 주소 (선택 입력 가능)" />
        <input type="text" placeholder="상담제목" required />
        <textarea placeholder="내용" rows={5} required />
        <button type="submit">상담문의 등록</button>
      </form>
    </div>
  );

  const renderModal = () => (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <h3>나의 문의 내역 확인</h3>
          <button className="close-button" onClick={() => setShowModal(false)}>×</button>
        </div>
        <p>문의하신 연락처를 입력하시기 바랍니다.</p>
        <div className="phone-inputs">
          <input type="text" maxLength="3" /> -
          <input type="text" maxLength="4" /> -
          <input type="text" maxLength="4" />
        </div>
        <button className="modal-confirm">확인</button>
      </div>
    </div>
  );

  const faqData = [
    {
      question: '학교 급식 우유는 마트 판매되는 일반 우유랑 따로 만드는 건가요?',
      answer: '학교급식우유는 마트 우유와 동일한 원유와 공정을 통해서 만들어 집니다. 간혹 우유 맛이 다르다고 느끼시는 분이 계신데, 무균팩, 포장재, 보관조건에 따라 맛이 다르게 느껴질 수 있으며, 학교 급식우유는 공장에서 학교로 바로 이동되는 단순한 유통과정을 통해서 가장 빠르고, 신선하게 납품되고 있습니다.'
    },
    {
      question: '살균/멸균 우유 차이점은 뭔가요?',
      answer: '살균우유는 상대적으로 낮은 온도에서 열처리하여 일부 미생물은 잔존해서, 잔존 미생물이 증식되지 않도록 냉장유통하는 소비기한이 짧은 우유입니다. 멸균우유는 높은 온도에서 미생물을 완전히 사멸하여 유균이 아닌 포장재도 멸균처리를 하여 상온에서 유통되는 소비기한이 긴 우유입니다.'
    },
    {
      question: '우유에 검은 이물질이 있어요.',
      answer: '정확한 원인은 현물을 확인해봐야 알 수 있지만, 우유에 검은 이물은 우유 탄화물일 가능성이 있습니다.\n1. 청입유라인: 우유를 팩에 담고 실링을 완료 직전하는 과정에서 간혹 팩 하단에 우유가 튀어서 생긴 우유탄화물일 가능성이 높습니다.\n2. 병우유: 우유를 병에 담고 살균공정 고온조건을 접하게는 과정에서 두공부에서 간혹 우유가 튀어서 생긴 우유탄화물일 가능성이 높습니다.'
    },
    {
      question: '살균 우유팩이 부풀었습니다. 상한 건가요?',
      answer: '우유팩은 종이와 PE층을 합지한 형태로 보관시 수분 흡수, 충격 등에 의해서 옆으로 벌어지는 현상이 나타납니다. 외부 습기가 많고 온도가 높아지는 하지기(5~9월)에 특히 많이 나타나는 증상입니다. 동일한 제품이라도 타단이 유통과정에 의해 구겨지는 등 코팅이 깨지거나, 외압에 충추가 맞았는 등의 외부요인도 노출여부에 따라 차이가 발생할 수 있습니다. 내용물이 멀고, 냄새 등의 현상 없이 단순 팩만 부푼 것은 품질에는 이상이 없으므로 정상적으로 음용하셔도 됩니다.'
    },
    {
      question: '멸균 우유팩이 빵빵하게 부풀었어요. 상한 건가요?',
      answer: '균팩이 부풀었습니다는 내용이 상한것으로 보입니다. 멸균우유는 우유 미생물을 완전히 제거하고 멸균팩에 담아 장시간 상온에서 유통되는 제품입니다. 다만, 유통중에 공정로 멸균팩에 미세피어싱이 생기며 이 부분으로 미생물의 혼입에 변질이 발생되며, 가스가 생성되는 균인 경우는 부풀게 됩니다. (멸균팩은 여러차례 코팅되어있으며, 뉴덜트는 멸균팩도 미세피어싱을 발생할 수 있음)'
    }
  ];

  return (
    <div>
      <Header />
      <div className="community-container">
        <h1 className="title">고객지원실</h1>
        <p className="subtitle">사랑받는 기업, 신뢰받는 기업이 되겠습니다.</p>
        <p className="welcome">안녕하세요. Choco House 고객 지원실입니다. <br />무엇을 도와드릴까요?</p>

        <div className="menu-tabs">
          {['공지사항', '자주하는 질문', '고객상담', '나의 문의내역'].map((tab) => (
            <span
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                if (tab === '나의 문의내역') {
                  setShowModal(true);
                } else {
                  setActiveTab(tab);
                  setOpenIndex(null);
                }
              }}
            >
              {tab}
            </span>
          ))}
        </div>

        {activeTab === '공지사항' && renderNotices()}
        {activeTab === '자주하는 질문' && renderFAQs()}
        {activeTab === '고객상담' && renderInquiryForm()}

        {showModal && renderModal()}
      </div>
    </div>
  );
}

export default Community;

// Community.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import './Community.css';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import DaumPostcode from 'react-daum-postcode';

function Community() {
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('공지사항');
  const [openIndex, setOpenIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [error, setError] = useState('');

  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [showPostcode, setShowPostcode] = useState(false);

  useEffect(() => {
  const saved = localStorage.getItem('inquiries');
  if (saved) setInquiries(JSON.parse(saved));
}, []);

  const categoryOptions = {
    '불편사항': ['제품배달 안됨', '다른제품 배달', '소비기한 불만', '제품 이상', '제품 내 이물', '제품이 새는 경우', '우유팩 개봉 불편', '기타'],
    '문의사항': ['제품 관련', '이벤트 관련', '주문 관련', '기타'],
    '건의사항': ['제품 관련', '이벤트 관련', '주문 관련', '기타']
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const noticeContents = [
    {
      title: '[새벽배송 지역 확대 안내]',
      content: `더 많은 분들께 신선한 초코우유를 전하고 싶은 마음으로,
Choco House의 새벽배송 가능 지역이 경기 남부 및 인천 전역까지 확대되었습니다.
이제 아침 식탁 위, 갓 짜낸 듯한 부드러움을 더 빠르게 만나보세요.
단, 기상 상황 및 일시적인 물류 제한에 따라 일부 지역은 제외될 수 있습니다.`
    },
    {
      title: '[초코데이 기념 한정 패키지 출시 🎁]',
      content: `초코우유로 마음을 전하는 5월 9일, Choco House가 준비한 ‘초코데이 스페셜 패키지’를 한정 수량으로 만나보세요!
감성 라벨과 고급 포장, 그리고 달콤한 메시지 카드까지.
소중한 사람에게 따뜻한 마음을 전할 기회, 놓치지 마세요.
판매 기간: 5월 1일 ~ 5월 9일 (재고 소진 시 조기 종료)`
    },
    {
      title: '[환경을 위한 작은 변화, 라벨 개선 안내]',
      content: `Choco House는 지구와 더 가까워지기 위해
초코우유 병의 라벨지를 친환경 소재로 전면 교체합니다.
분리배출이 쉬워지고, 탄소배출은 줄어드는 착한 변화에
여러분의 따뜻한 응원을 더해주세요.
4월 15일 이후 출고되는 제품부터 적용됩니다.`
    }
  ];

const renderMyPage = () => (
  <div className="mypage-section">
    <h2 className="mypage-title">나의 상담내역</h2>
    <p className="mypage-count">
      총 <span className="mypage-count-red">{inquiries.filter(item => item.phone === `${phone1}-${phone2}-${phone3}`).length}</span>개의 게시물이 있습니다

    </p>
    <table className="mypage-table">
      <thead>
        <tr>
          <th className="no">NO</th>
          <th className="category">상담 카테고리</th>
          <th className="title">제목</th>
          <th className="date">등록일</th>
          <th className="status">답변 등록</th>
        </tr>
      </thead>
      <tbody>
        {inquiries.length > 0 ? (
          inquiries
            .filter((item) => item.phone === `${phone1}-${phone2}-${phone3}`)
            .map((item, index) => (
              <tr key={index}>
                <td>{item.no}</td>
                <td>{`${item.category} - ${item.subcategory}`}</td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>
  {item.answered ? (
    '답변완료'
  ) : (
    <span className="status-waiting">대기중</span>
  )}
</td>

              </tr>
            ))
        ) : (
          <tr>
            <td colSpan="5" className="mypage-empty">
              등록된 상담 내역이 없습니다.
            </td>
          </tr>
        )}
      </tbody>

    </table>
  </div>
);

  const renderNotices = () => (
    <div className="accordion">
      {noticeContents.map((notice, i) => (
        <div className="accordion-item" key={i}>
          <div className="accordion-header" onClick={() => toggleAccordion(i)}>
            <div className="notice-title">{notice.title}</div>
            <span className="arrow-icon">
              {openIndex === i ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </span>
          </div>
          {openIndex === i && (
            <div className="accordion-body">
              {notice.content.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
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
          <div className="faq-question">
            <span className="faq-icon q-icon">Q</span>
            {item.question}
          </div>
          {openIndex === index && (
            <div className="faq-answer">
              <span className="faq-icon a-icon">A</span>
              <div className="faq-text">
                {item.answer.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

const renderInquiryForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form[0].value;
    const phone = form[1].value;
    const category = form[6].value;
    const subcategory = form[7].value;
    const title = form[8].value;
    const content = form[9].value;

    const newInquiry = {
      no: inquiries.length + 1,
      name,
      phone,
      category,
      subcategory,
      title,
      content,
      date: new Date().toLocaleDateString(),
      answered: false,
    };

    const updatedInquiries = [...inquiries, newInquiry];
    setInquiries(updatedInquiries);
    localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
    alert('상담이 등록되었습니다.');

    // ✅ 모든 입력 필드 초기화
    form.reset();
    setPhone1('');
    setPhone2('');
    setPhone3('');
    setZipcode('');
    setAddress('');
    setCategory('');
    setSubcategory('');
    setOpenIndex(null);
    setActiveTab('공지사항');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="inquiry-form">
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

      <h3>고객 기본정보</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="이름" required />
        <input type="tel" placeholder="연락처" required />

        <p className="small-title">주소</p>
        <div className="zip-row">
          <input
            type="text"
            placeholder="우편번호"
            value={zipcode}
            readOnly
          />
          <button type="button" onClick={() => setShowPostcode(true)}>
            우편번호 찾기
          </button>
        </div>
        <input
          type="text"
          placeholder="기본주소"
          value={address}
          readOnly
        />
        <input type="text" placeholder="나머지 주소 (선택 입력 가능)" />
        <p className="consent-warning">
          클레임 제품 회수를 원하실 경우 주소를 입력하시기 바랍니다.
        </p>

        <p className="small-title">상담분류</p>
        <div className="dropdown-row">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory('');
            }}
            required
          >
            <option value="">상담분류 선택</option>
            {Object.keys(categoryOptions).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={!category}
            required
          >
            <option value="">세부분류 선택</option>
            {categoryOptions[category]?.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <input type="text" placeholder="제목" required />
        <textarea className="same-font" placeholder="내용" rows={5} required></textarea>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit">상담문의 등록</button>
        </div>
      </form>
    </div>
  );
};


  const handlePhoneCheck = () => {
    if (!/^[0-9]{3}$/.test(phone1) || !/^[0-9]{3,4}$/.test(phone2) || !/^[0-9]{4}$/.test(phone3)) {
      setError('올바른 연락처를 입력해주세요.');
      return;
    }
    setShowModal(false);
    setError('');
    setActiveTab('나의 문의내역');
  };

  const renderModal = () => (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
        <h3 className="modal-title">나의 문의 내역 확인</h3>
        <div className="x-area" onClick={() => setShowModal(false)}>×</div>
      </div>

        <p>문의하신 연락처를 입력하시기 바랍니다.</p>

        <div className="phone-inputs">
  <input
    type="text"
    maxLength="3"
    value={phone1}
    onChange={(e) => {
      setPhone1(e.target.value);
      if (e.target.value.length === 3) {
        document.getElementById('phone2')?.focus();
      }
    }}
  /> -

  <input
    id="phone2"
    type="text"
    maxLength="4"
    value={phone2}
    onChange={(e) => {
      setPhone2(e.target.value);
      if (e.target.value.length === 4) {
        document.getElementById('phone3')?.focus();
      }
    }}
  /> -

  <input
    id="phone3"
    type="text"
    maxLength="4"
    value={phone3}
    onChange={(e) => setPhone3(e.target.value)}
  />
</div>       
        <button className="modal-confirm" onClick={handlePhoneCheck}>확인</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );

  const faqData = [
    {
      question: '학교 급식 우유는 마트 판매되는 일반 우유랑 따로 만드는 건가요?',
      answer: '학교급식우유는 마트 우유와 동일한 원료와 공정을 통해서 만들어 집니다.\n간혹 우유 맛이 다르다고 느끼시는 분이 계신데, 우유는 포장용기, 보관시간, 보관온도에 따라 맛이 다르게 느껴질 수 있으며, 학교 급식우유는 공장에서 학교로 바로 이송되는 단순한 유통과정을 통해서 가장 빠르고, 신선하게 납품되고 있습니다.'
    },
    {
      question: '살균/멸균 우유 차이점은 뭔가요?',
      answer: '살균우유는 상대적으로 낮은 온도에서 열처리되어 일부 미생물은 잔존해서, 잔존 미생물이 증식되어 변질되지 않도록 냉장유통하는 소비기한이 짧은 우유입니다.\n멸균우유는 높은 온도에서 미생물을 완전히 사멸되어 우유만이 아닌 포장재도 멸균처리를 하여 상온에서 유통하는 소비기한이 긴 우유입니다.'
    },
    {
      question: '우유에 검은 이물질이 있어요.',
      answer: '정확한 원인은 현물을 확인해봐야 알 수 있지만, 우유에 검은 이물은 우유 탄화물일 가능성이 있습니다.\n1. 종이팩우유: 우유를 팩에 담고 상단을 열로 접착하는 과정에서 간혹 히터에 우유가 튀어서 생긴 우유탄화물일 가능성이 높습니다.\n2. 병우유: 우유를 병에 담고 속뚜껑을 고주파로 접착하는 과정에서 뚜껑부분에 간혹 우유가 튀어서 생긴 우유탄화물일 가능성이 높습니다.'
    },
    {
      question: '살균 우유팩이 부풀었어요. 상한 건가요?',
      answer: '우유팩은 종이에 PE등을 합지한 형태로 보관 시 수분 흡수, 중력 등에 의해서 옆으로 벌어지는 현상이 나타납니다. 외부 습기가 많고 온도가 높아지는 하절기(5~9월)에 특히 많이 나타나는 증상입니다.\n동일한 제품이라도 카톤이 외부충격에 의해 구겨지는 등 코팅이 깨지거나, 외면에 응축수가 맺히는 등의 외부온도 노출여부에 따라 차이가 발생할 수 있습니다. 내용물이 응고, 냄새 등의 현상 없이 단순 팩만 부푼 것은 품질에는 이상이 없으므로 정상적으로 음용하셔도 됩니다.'
    },
    {
      question: '멸균 우유팩이 빵빵하게 부풀었어요. 상한 건가요?',
      answer: '멸균팩이 부푼 형상은 내용물이 상한 것으로 보입니다. 멸균유는 우유 미생물을 완전히 제거하고 멸균팩에 담아 장시간 상온에서 유통되는 제품입니다.\n다만, 유통중에 충격으로 멸균팩에 미세핀홀이 생기면 이 부분으로 미생물이 오염되어 변질이 발생되고, 가스가 생성되는 균인 경우는 부풀게 됩니다. (멸균팩은 여러겹으로 되어있어, 누유되지는 않더라도 미세핀홀은 발생할 수 있음).'
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
        {activeTab === '나의 문의내역' && renderMyPage()}

      {showModal && renderModal()}

{showPostcode && (
  <div className="modal-backdrop">
    <div className="modal-box" > {/* ✅ 여백 확보 */}
      <button
        className="close-button-postcode"
        onClick={() => setShowPostcode(false)}
      >
        ×
      </button>
      <DaumPostcode
        onComplete={(data) => {
          setZipcode(data.zonecode);
          setAddress(data.address);
          setShowPostcode(false);
        }}
      />
    </div>
  </div>
)}


      </div>
    </div>
  );
}
export default Community;

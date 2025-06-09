import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import Header from './Header';

import DaumPostcode from 'react-daum-postcode';
import products from '../data/products';

function PaymentPage() {
  const [cartItems, setCartItems] = useState([]);
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('naver.com');
  const [customDomain, setCustomDomain] = useState('');
  const [customRequest, setCustomRequest] = useState('');
  const [requestOption, setRequestOption] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [orderInfo, setOrderInfo] = useState({ name: '', phone: '' });
  const [receiverInfo, setReceiverInfo] = useState({ name: '', phone: '', address: '', detail: '' });
  const [isPostOpen, setIsPostOpen] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const directBuy = JSON.parse(localStorage.getItem('directBuy'));

    if (directBuy) {
      console.log('✅ directBuy 로드됨:', directBuy);
      setCartItems([directBuy]);
    } else {
      setCartItems(savedCart);
    }
  }, []);

  const getNumericPrice = (price) =>
    typeof price === 'number' ? price : parseInt(price.replace(/[^0-9]/g, ''), 10);

  const totalPrice = cartItems.reduce((sum, item) => {
    const p = products.find((p) => p.id === item.id);
    return sum + getNumericPrice(p?.price || item.price || 0) * (item.quantity || 1);
  }, 0);

  const deliveryFee = totalPrice >= 20000 ? 0 : 2500;
  const finalPrice = totalPrice + deliveryFee;

  const handleCopyOrderInfo = () => {
    setReceiverInfo((prev) => ({
      ...prev,
      name: orderInfo.name,
      phone: orderInfo.phone,
    }));
  };

  const handleAddressComplete = (data) => {
    let full = data.address;
    setReceiverInfo((prev) => ({ ...prev, address: `[${data.zonecode}] ${full}` }));
    setIsPostOpen(false);
  };

  const getFullEmail = () => {
    return `${emailId}@${emailDomain === 'custom' ? customDomain : emailDomain}`;
  };

  return (
    <>
      <Header />
      <div className="payment-wrapper">
        <div className="payment-container">
          <h2 className="payment-title">결제하기</h2>
          <div className="payment-layout">
            <div className="payment-left">
              {/* 주문고객정보 */}
              <section className="payment-section-box">
                <h3 className="payment-section-heading">주문고객정보</h3>
                <div className="payment-form-grid">
                  <label>이름</label>
                  <input type="text" value={orderInfo.name} onChange={(e) => setOrderInfo({ ...orderInfo, name: e.target.value })} />

                  <label>이메일</label>
                  <div className="email-group">
                    <input type="text" value={emailId} placeholder="아이디" onChange={(e) => setEmailId(e.target.value)} />
                    <span>@</span>
                    {emailDomain !== 'custom' ? (
                      <select value={emailDomain} onChange={(e) => setEmailDomain(e.target.value)}>
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="daum.net">daum.net</option>
                        <option value="icloud.com">icloud.com</option>
                        <option value="custom">직접 입력</option>
                      </select>
                    ) : (
                      <input type="text" value={customDomain} placeholder="도메인 입력" onChange={(e) => setCustomDomain(e.target.value)} />
                    )}
                  </div>

                  <label>휴대전화</label>
                  <div className="phone-group">
                    <select><option>010</option></select>
                    <input type="text" value={orderInfo.phone} onChange={(e) => setOrderInfo({ ...orderInfo, phone: e.target.value })} placeholder="'-' 없이 입력" />
                  </div>
                </div>
              </section>

              {/* 배송지 정보 */}
              <section className="payment-section-box">
                <h3 className="payment-section-heading">배송지 정보 <button className="same-btn" onClick={handleCopyOrderInfo}>주문 고객과 동일</button></h3>
                <div className="payment-form-grid">
                  <label>받는 분</label>
                  <input type="text" value={receiverInfo.name} onChange={(e) => setReceiverInfo({ ...receiverInfo, name: e.target.value })} />
                  <label>연락처</label>
                  <div className="phone-group">
                    <select><option>010</option></select>
                    <input type="text" value={receiverInfo.phone} onChange={(e) => setReceiverInfo({ ...receiverInfo, phone: e.target.value })} placeholder="'-' 없이 입력" />
                  </div>
                  <label>주소</label>
                  <div className="address-group">
                    <input type="text" readOnly value={receiverInfo.address} placeholder="주소 검색" />
                    <button className="zipcode-btn" onClick={() => setIsPostOpen(true)}>우편번호 찾기</button>
                  </div>
                  <label>상세주소</label>
                  <input type="text" value={receiverInfo.detail} onChange={(e) => setReceiverInfo({ ...receiverInfo, detail: e.target.value })} placeholder="상세주소 입력" />
                </div>
              </section>

              {/* 배송 요청사항 */}
              <div className="memo-box">
                <h4>배송 요청사항</h4>
                <div className="memo-container">
                  <select value={requestOption} onChange={(e) => setRequestOption(e.target.value)}>
                    <option>배송 요청사항 선택</option>
                    <option>부재 시 문 앞에 놓아주세요</option>
                    <option>경비실에 맡겨주세요</option>
                    <option>직접 수령하겠습니다</option>
                    <option>배송 전 연락 부탁드립니다</option>
                    <option>택배함에 넣어주세요</option>
                    <option>직접 입력</option>
                  </select>
                  {requestOption === '직접 입력' && (
                    <input type="text" placeholder="요청사항 입력" value={customRequest} onChange={(e) => setCustomRequest(e.target.value)} style={{ marginTop: '10px', width: '100%' }} />
                  )}
                </div>
              </div>

              {/* 주문상품 */}
              <section className="payment-section-box">
                <div className="payment-section-heading">
                  <h3>주문상품</h3>
                  <span>총 {cartItems.length}건</span>
                </div>
                {cartItems.map((item) => {
                  const p = products.find((p) => p.id === item.id) || item;
                  const price = getNumericPrice(p.price);
                  return (
                    <div key={item.id} className="payment-product-box">
                      <img src={p.image} alt={p.name} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: 4 }}>{p.name}</p>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#555' }}>{price.toLocaleString()}원 / {item.quantity || 1}개</span>
                    </div>
                  );
                })}
              </section>

              {/* 결제 수단 */}
              <section className="payment-section-box">
                <h3 className="payment-section-heading">결제 수단 선택</h3>
                <div className="payment-methods">
                  {["토스페이", "신용카드", "네이버페이", "카카오페이", "PAYCO", "Samsung pay", "L.Pay", "무통장 입금", "계좌이체", "휴대폰결제"].map((method) => (
                    <button key={method} className={selectedPayment === method ? 'selected-payment' : ''} onClick={() => setSelectedPayment(method)}>{method}</button>
                  ))}
                </div>
                <p className="notice">
                  · 세금계산서는 고객상담실과 상담 후 발급 가능합니다.<br />
                  · 주문 완료 시 회원정보 등록과 함께 결제정보 저장됩니다.<br />
                  · 현금영수증은 결제일 익일 오전 9시부터 국세청 조회 가능합니다.
                </p>
              </section>
            </div>

            {/* 결제 요약 */}
            <aside className="payment-summary-box">
              <p>총 상품 금액 <span>{totalPrice.toLocaleString()}원</span></p>
              <p>배송비 <span>{deliveryFee.toLocaleString()}원</span></p>
              <p className="total">최종 결제 금액 <span>{finalPrice.toLocaleString()}원</span></p>
              <button className="payment-order-btn" onClick={() => localStorage.removeItem('directBuy')}>결제하기</button>
            </aside>
          </div>
        </div>
      </div>

      {/* 우편번호 검색 */}
      {isPostOpen && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <button className="close-button-postcode" onClick={() => setIsPostOpen(false)}>×</button>
            <DaumPostcode onComplete={handleAddressComplete} />
          </div>
        </div>
      )}

    
    </>
  );
}

export default PaymentPage;
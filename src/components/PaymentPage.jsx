import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import Header from './Header';
import Footer from './Footer';

function PaymentPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = totalPrice >= 20000 ? 0 : 2500;
  const finalPrice = totalPrice + deliveryFee;

  return (
    <>
      <Header />
      <div className="payment-wrapper">
        <div className="payment-container">
          <h2 className="payment-title">결제하기</h2>

          <div className="payment-layout">
            {/* 왼쪽 영역 */}
            <div className="payment-left">
              {/* 주문고객정보 */}
              <section className="payment-section-box">
                <h3 className="payment-section-heading">주문고객정보</h3>
                <div className="payment-form-grid">
                  <label>이름</label>
                  <input type="text" />
                  <label>이메일</label>
                  <div className="email-group">
                    <input type="text" />
                    <span>@</span>
                    <input value="naver.com" readOnly />
                  </div>
                  <label>휴대전화</label>
                  <div className="phone-group">
                    <select><option>010</option></select>
                    <input type="text" placeholder="'-' 없이 휴대폰번호 입력" />
                  </div>
                  <label>보내는 분</label>
                  <input type="text" placeholder="보내는 분 입력" />
                  <div className="sender-info-box">
                    · 보내는 분 별도 표기하더라도 고객정보 보호를 위해 마스킹 처리되어 발송됩니다.<br />
                  </div>
                </div>
              </section>

              {/* 배송지 정보 */}
              <section className="payment-section-box">
                <h3 className="payment-section-heading">
                  배송지 정보
                  <button className="same-btn">주문 고객과 동일</button>
                </h3>
                <div className="payment-form-grid">
                  <label>받는 분</label>
                  <input type="text" />
                  <label>연락처</label>
                  <div className="phone-group">
                    <select><option>010</option></select>
                    <input type="text" placeholder="'-' 없이 휴대폰번호 입력" />
                  </div>
                  <label>주소</label>
                  <div className="address-group">
                    <input type="text" />
                    <button className="zipcode-btn">우편번호 찾기</button>
                  </div>
                  <label>상세주소</label>
                  <input type="text" placeholder="상세주소 입력" />
                </div>
                <div className="memo-box">
                  <h4>배송 요청사항</h4>
                  <div className="memo-container">
                    <select>
                      <option>배송 요청사항 선택</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* 주문상품 영역 */}
              <section className="payment-section-box">
                <h3 className="payment-section-heading">주문상품</h3>
                {cartItems.map((item) => (
                  <div key={item.id} className="payment-product-box">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p className="payment-price">{(item.price * item.quantity).toLocaleString()}원 / {item.quantity}개</p>
                      <p className="payment-meta">{item.desc || "포장불가 · 쇼핑백동봉"}</p>
                    </div>
                  </div>
                ))}
              </section>

              {/* 결제 수단 */}
              <section className="payment-section-box">
                <h3 className="payment-section-heading">결제 수단 선택</h3>
                <div className="payment-methods">
                  {[
                    'toss pay', '신용카드', '네이버페이', '카카오페이', 'PAYCO',
                    'Samsung pay', 'L.Pay', '무통장 입금', '계좌이체', '휴대폰결제'
                  ].map((m, i) => (
                    <button key={i}>
                    
                      {m}
                    </button>
                  ))}
                </div>
                <p className="notice">
                  · 세금계산서는 고객상담실과 상담 후 발급이 가능합니다. (Tel: 080-805-5555)<br />
                  · 오설록몰에서 주문완료 시, 결제내용 및 배송정보 확인을 위해 회원정보가 함께 등록됩니다.<br />
                  · 현금영수증은 결제일 기준 익일 오전 09시 이후부터 국세청에서 조회할 수 있습니다.
                </p>
              </section>

              {/* 구매 동의 */}
              <section className="payment-section-box payment-agreement">
                <label className="payment-agreement-label">
                  <input type="checkbox" /> 위 상품의 판매조건을 명확히 확인하였으며, 구매 진행에 동의합니다.
                </label>
                <ul className="payment-agreement-detail">
                  <li>할인쿠폰 적용 후 총 결제 금액이 3만원 이상일 경우 무료 배송이 적용됩니다.</li>
                  <li>배송 정보가 동일할 경우 자동으로 합배송됩니다.</li>
                  <li>예) 2건 중 1건 환불 시 배송비는 환불 제외될 수 있음</li>
                  <li>* 단, 합배송 개별 신청은 불가능합니다.</li>
                </ul>
              </section>
            </div>

            {/* 우측 요약 박스 */}
            <aside className="payment-summary-box">
              <p>총 상품 금액 <span>{totalPrice.toLocaleString()}원</span></p>
              <p>배송비 <span>{deliveryFee.toLocaleString()}원</span></p>
              <p className="total">최종 결제 금액 <span>{finalPrice.toLocaleString()}원</span></p>
              <button className="payment-order-btn">결제하기</button>
              <p className="summary-notice">베이커리·냉동 제품 배송비 유의사항 🛈</p>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentPage;

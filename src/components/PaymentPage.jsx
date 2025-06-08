import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import Header from './Header';
import Footer from './Footer';
import products from '../data/products'; // ✅ 상품 목록 불러오기

function PaymentPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const getNumericPrice = (price) => {
    if (typeof price === 'number') return price;
    return parseInt(price.replace(/[^0-9]/g, ''), 10);
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    const price = getNumericPrice(product?.price || item.price || 0);
    return sum + price * (item.quantity || 1);
  }, 0);

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
                    <input type="text" placeholder="'-' 없이 입력" />
                  </div>
                </div>
              </section>

              {/* 배송지 정보 */}
              <section className="payment-section-box">
                <h3 className="payment-section-heading">
                  배송지 정보 <button className="same-btn">주문 고객과 동일</button>
                </h3>
                <div className="payment-form-grid">
                  <label>받는 분</label>
                  <input type="text" />
                  <label>연락처</label>
                  <div className="phone-group">
                    <select><option>010</option></select>
                    <input type="text" placeholder="'-' 없이 입력" />
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
                      <option>부재 시 문 앞에 놓아주세요</option>
                      <option>경비실에 맡겨주세요</option>
                      <option>직접 수령하겠습니다</option>
                      <option>배송 전 연락 부탁드립니다</option>
                      <option>택배함에 넣어주세요</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* 주문상품 */}
              <section className="payment-section-box">
                <div className="payment-section-heading">
                  <h3>주문상품</h3>
                  <span>총 {cartItems.length}건</span>
                </div>
                {cartItems.map((item) => {
                  const product = products.find(p => p.id === item.id);
                  if (!product) return null;

                  const price = getNumericPrice(product.price);

                  return (
                    <div key={item.id} className="payment-product-box">
                      <img src={product.image} alt={product.name} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '500', fontSize: '0.95rem', marginBottom: '4px' }}>
                          {product.name}
                        </p>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#555' }}>
                        {price.toLocaleString()}원 / {item.quantity || 1}개
                      </span>
                    </div>
                  );
                })}
              </section>

              {/* 결제 수단 */}
              <section className="payment-section-box">
                <h3 className="payment-section-heading">결제 수단 선택</h3>
                <div className="payment-methods">
                  {[
                    '토스페이', '신용카드', '네이버페이', '카카오페이', 'PAYCO',
                    'Samsung pay', 'L.Pay', '무통장 입금', '계좌이체', '휴대폰결제'
                  ].map((method, i) => (
                    <button key={i}>{method}</button>
                  ))}
                </div>
                <p className="notice">
                  · 세금계산서는 고객상담실과 상담 후 발급 가능합니다.<br />
                  · 주문완료 시, 회원정보 등록과 함께 결제정보 저장됩니다.<br />
                  · 현금영수증은 결제일 익일 오전 9시부터 국세청 조회 가능.
                </p>
              </section>

              {/* 구매 동의 */}
              <section className="payment-section-box payment-agreement">
                <label className="payment-agreement-label">
                  <input type="checkbox" /> 위 상품의 판매 조건을 명확히 확인하였으며, 구매에 동의합니다.
                </label>
                <ul className="payment-agreement-detail">
                  <li>총 결제 금액이 2만원 이상 시 무료배송 적용</li>
                  <li>배송지 동일 시 자동 합배송 처리</li>
                  <li>예: 2건 중 1건 환불 시 배송비 제외 가능</li>
                  <li>* 합배송 개별 신청 불가</li>
                </ul>
              </section>
            </div>

            {/* 결제 요약 */}
            <aside className="payment-summary-box">
              <p>총 상품 금액 <span>{totalPrice.toLocaleString()}원</span></p>
              <p>배송비 <span>{deliveryFee.toLocaleString()}원</span></p>
              <p className="total">최종 결제 금액 <span>{finalPrice.toLocaleString()}원</span></p>
              <button className="payment-order-btn">결제하기</button>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentPage;
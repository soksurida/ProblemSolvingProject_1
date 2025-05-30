import React from 'react';
import './PaymentPage.css';
import Header from './Header';
import Footer from './Footer';

function PaymentPage() {
  return (
    <>
      <Header />
      <div className="payment-page-wrapper">
        <div className="payment-page">
          <h2 className="section-title">결제하기</h2>

          <div className="payment-layout">
            <div className="payment-left">
              {/* 주문고객 정보 */}
              <section className="section-box">
                <h3>주문고객정보</h3>
                <div className="form-grid">
                  <input placeholder="이름" />
                  <div className="email-group">
                    <input placeholder="이메일" />
                    <span>@</span>
                    <input value="naver.com" readOnly />
                  </div>
                  <div className="phone-group">
                    <select><option>010</option></select>
                    <input placeholder="'-' 없이 휴대폰번호 입력" />
                  </div>
                  <input placeholder="보내는 분" />
                </div>
              </section>

              {/* 배송지 정보 */}
              <section className="section-box">
                <h3>배송지 정보 <button className="same-btn">주문 고객과 동일</button></h3>
                <div className="form-grid">
                  <input placeholder="받는 분" />
                  <div className="phone-group">
                    <select><option>010</option></select>
                    <input placeholder="'-' 없이 휴대폰번호 입력" />
                  </div>
                  <div className="address-group">
                    <input placeholder="주소" />
                    <button>우편번호 찾기</button>
                  </div>
                  <input placeholder="상세주소 입력" />
                </div>

                {/* 배송 요청사항 박스 */}
                <div className="memo-box">
                  <h4>배송 요청사항</h4>
                  <div className="memo-container">
                    <select>
                      <option>배송 요청사항 선택</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* 주문상품 정보 */}
              <section className="section-box">
                <h3>주문상품</h3>
                <div className="product-box">
                  <img src="/img/choco.png" alt="choco" />
                  <div>
                    <p>[매일우유] 허쉬 초코우유 단품</p>
                    <p className="price">5,500원 / 1개</p>
                  </div>
                </div>
              </section>

              {/* 결제 수단 선택 */}
              <section className="section-box">
                <h3>결제 수단 선택</h3>
                <div className="payment-methods">
                  {["toss pay", "신용카드", "네이버페이", "카카오페이", "PAYCO", "Samsung pay", "L.Pay", "무통장 입금", "계좌이체", "휴대폰결제"].map((m, i) => (
                    <button key={i}>{m}</button>
                  ))}
                </div>
                <p className="notice">
                  ※ 세금계산서는 고객상담실과 상담 후 발급이 가능합니다. (Tel: 031-670-5114)<br />
                  ※ 현금영수증은 결제일 기준, 익일 오전 09시 이후부터 국세청에서 조회할 수 있습니다.
                </p>
              </section>

              {/* 동의 체크 */}
              <section className="section-box agreement">
                <label className="agreement-label">
                  <input type="checkbox" /> 위 상품의 판매조건을 명확히 확인하였으며, 구매 진행에 동의합니다.
                </label>
                <ul className="agreement-detail">
                  <li>할인쿠폰 적용 후 총 결제 금액(배송비, 쇼핑백 환경부담금 제외)이 3만원 이상인 경우 무료 배송이 적용됩니다. (단, 티웨어는 브랜드별로 무료배송기준이 상이하오니, 제품고시정보 내의 배송안내 확인바랍니다.)</li>
                  <li>배송 정보(수취인정보)가 동일할 경우 자동으로 합배송(1개의 송장번호) 될 수 있습니다. (반드시 제품 수령 후, 송장번호 기입하셔서 1:1 상담 게시판을 통해 배송비 환불 요청해주세요.)</li>
                  <li>예) 2건의 주문 건 중 무료배송 주문 건과 배송료를 지불한 주문 건이 합배송되었을 경우 1건의 배송료 환불</li>
                  <li>다수의 주문건에 대해 환불을 받는 대신 배송료를 결제하는 경우, 합배송 환불에서 제외 될 수도 있습니다.</li>
                  <li>예) 2건의 주문 건 모두 배송료를 지불하였을 경우 1건의 배송료만 환불</li>
                  <li>* 단, 합배송 개별 신청은 불가능합니다.</li>
                </ul>
              </section>
            </div>

            {/* 우측 결제 요약 */}
            <aside className="summary-box">
              <p>총 상품 금액 <span>2,500원</span></p>
              <p>배송비 <span>3,000원</span></p>
              <p className="total">최종 결제 금액 <span>5,500원</span></p>
              <button className="order-btn">5,500원 주문하기</button>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentPage;
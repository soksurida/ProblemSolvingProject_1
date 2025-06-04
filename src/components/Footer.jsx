import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="inquiry-box">
        <h3>고객 문의</h3>
        <button className="inquiry-btn">바로가기</button>
      </div>

      <div className="footer-links">
        <a href="#">회사소개</a>
        <a href="#">이용약관</a>
        <a href="#">개인정보처리방침</a>
        <a href="#">이용안내</a>
      </div>

      <div className="footer-info">
        <p>법인명: 주식회사 초코 / 대표자: 문해프</p>
        <p>
          사업자등록번호 : 25-032812-888 [사업자정보확인] / 통신판매업 신고
          제2025-한강-0328호
        </p>
        <p>
          전화 : 031-670-5114 / 팩스 : 031-670-5160 / 주소 : 17579 경기도 안성시
          석정동 327 한경국립대학교 제1공학관
        </p>
        <p>
          개인정보관리책임 : 양근석 (yanglamp@hknu.ac.kr) Hosting by hankyong
        </p>
        <p>고객센터 : 031-670-5161 | 평일 : 09시~18시 | 주말 및 공휴일 휴무</p>
        <p>예금주 : (주)한경 초코 신한은행 482-849155-1599</p>
      </div>
    </footer>
  );
}

export default Footer;
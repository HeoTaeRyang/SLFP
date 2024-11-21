import React from 'react';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="mainbox">
      <div className="maincontent">
        <div className="mainimg">
          <img src="slfp_main.png" alt="SLFP 메인 이미지" className="mainimg-slfp" />
        </div>
        <main className="main-text">
          <div className="main-aboutus">
            <div className="main-aboutus-1">ABOUT US</div>
            <div className="main-aboutus-2">“ 삼성 라이온즈 ”</div>
            <div className="main-aboutus-3">
              1982년 한국 프로야구 출범과 함께 창단된 6개 구단 중 하나로서
              <br />
              대구광역시를 연고로 하는 KBO 리그의 오랜 역사를 가진
              <br />
              대한민국 프로야구의 명문 구단
            </div>
          </div>

          <div className="main-history">
            <div className="main-history-1">OUR HISTORY</div>
            <div className="main-history-2">
              1980년, 원년 구단으로 첫 시즌부터 상위권 기록
              <br />
              1985년, 정규 시즌 우승
              <br />
              1990년, 꾸준히 정규시즌 강자로 활약 (한국 시리즈 우승과는 별개)
              <br />
              2002년, 첫 한국 시리즈 우승 및 전성기 맞이
              <br />
              2011년, 4년 연속 한국시리즈 우승과 KBO 리그의 최강팀으로 군림
              <br />
              2020년, 세대교체를 통해 재도약 시도
            </div>
          </div>

          <div className="main-news-box">
          <h2 className="main-news-title">NEWS</h2>
          <div className="main-news-text1">
          15일 대구 삼성라이온즈파크에서 열린 2024 신한 SOL ...</div>
          <button className="main-news-read-button1">Read more</button>
          <div className="main-news-line"></div>
          <div className="main-news-text2">
          가을도 지배한 삼성의 ‘영웅 스윙’ [IS 스타]</div>
          <button className="main-news-read-button2">Read more</button>
          <button className="main-news-read-all-button">Read all news</button>
          <img className="main-news-pic1" src="main-news-pic1.png" alt="News Thumbnail" />
          <img className="main-news-pic2" src="main-news-pic2.png" alt="Another Thumbnail" />
        </div>
        </main>

        <footer className="footer">
          <div className="footer_msg">ⓒ 2024. YU_SLFP All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
};

export default Home;

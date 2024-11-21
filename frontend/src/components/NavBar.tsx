// navbar.tsx
import React from 'react';
import '../styles/NavBar.css';  // 네비게이션 스타일

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
     <div className="nav-bar-top">
      <div className="nav-con">
        <a href="/" className="navbt0">선수단</a>
        <a href="/" className="navbt1">경기 정보</a>
        <a href="/" className="navbt2">커뮤니티</a>
        <a href="/" className="navbt6">SAMSUNG LIONS</a>
        <a href="/" className="navbt3">로그인</a>
        <a href="/" className="navbt4">마이페이지</a>
        <a href="/" className="navbt5">회원가입</a>
      </div>
    </div>
    <div className="nav-bar-down">
     <div className="nav-con">
     <a href="/" className="navbt7">감독</a>
     <a href="/" className="navbt8">코칭 스텝</a>
     <a href="/" className="navbt9">투수</a>
     <a href="/" className="navbt10">타자</a>
     <a href="/admin" className="navbt10">관리자</a>
     <a href="/findlike" className="navbt10">닮은 선수 찾기</a>
     </div>
    </div>
  </nav>
  );
};

export default NavBar;
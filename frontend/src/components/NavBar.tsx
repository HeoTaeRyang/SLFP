import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import axios from "axios";

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // 로컬 스토리지를 확인하여 로그인 상태와 사용자 아이디 업데이트
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    setIsLoggedIn(!!token);
    setUserId(storedUserId || ""); // Null 값을 방지
  }, []);

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId(null);
    navigate("/login");
  };

  // 출석 핸들러
  const handleAttendance = async () => {
    try {
        const requestData = {
            id: localStorage.getItem('userId'),
        };

        const response = await axios.post(
            'http://localhost:5000/attendence',
            requestData,
            { headers: { 'Content-Type': 'application/json' } }
        );
        alert(response.data.answer);
    } catch (e) {
        console.error('error:', e);
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-bar-top">
        <div className="nav-con">
          <a href="/" className="navbt0">선수단</a>
          <a href="/" className="navbt1">경기 정보</a>
          <a href="/" className="navbt2">커뮤니티</a>
          <a href="/" className="navbt6">SAMSUNG LIONS</a>
          {isLoggedIn ? (
            <>
              <span className="navbt3">{userId ? `${userId}님` : "사용자님"}</span>
              <button onClick={handleAttendance} className="navbt4">
                출석
              </button>
              <button onClick={handleLogout} className="navbt4">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="navbt3">로그인</a>
              <a href="/register" className="navbt5">회원가입</a>
            </>
          )}
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null); // 호버 상태 추가
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

  // 메뉴 호버 핸들러
  const handleMouseEnter = (menu: string) => setHoveredMenu(menu);
  const handleMouseLeave = () => setHoveredMenu(null);

  return (
    <nav className="navbar">
      <div className="nav-bar-top">
        <div className="nav-con">
          <div
            className="nav-item"
            onMouseEnter={() => handleMouseEnter("선수단")}
            onMouseLeave={handleMouseLeave}
          >
            <a href="/" className="navbt0">
              선수단
            </a>
            {hoveredMenu === "선수단" && (
              <div className="dropdown-menu">
                <a href="/players/coaches">코칭 스태프</a>
                <a href="/players/pitchers">투수</a>
                <a href="/players/batters">타자</a>
              </div>
            )}
          </div>
          <div
            className="nav-item"
            onMouseEnter={() => handleMouseEnter("경기 정보")}
            onMouseLeave={handleMouseLeave}
          >
            <a href="/" className="navbt1">
              경기 정보
            </a>
            {hoveredMenu === "경기 정보" && (
              <div className="dropdown-menu">
                <a href="/gamenext">경기 일정</a>
                <a href="/gamelast">경기 결과</a>
                <a href="/gameranking">순위</a>
              </div>
            )}
          </div>
          <div
            className="nav-item"
            onMouseEnter={() => handleMouseEnter("커뮤니티")}
            onMouseLeave={handleMouseLeave}
          >
            <a href="/free/post" className="navbt2">
              커뮤니티
            </a>
            {hoveredMenu === "커뮤니티" && (
              <div className="dropdown-menu">
                <a href="/free/post">자유 게시판</a>
                <a href="/matchplayer">선수이미지 맞추기</a>
                <a href="/findlike">닮은꼴 선수 찾기</a>
              </div>
            )}
          </div>
          <a href="/" className="navbt6">
            SAMSUNG LIONS
          </a>
          {isLoggedIn ? (
            <>
              <span className="navbt3">
                {userId ? `${userId}님` : "사용자님"}
              </span>
          <a onClick={handleLogout} className="navbt4">
          로그아웃
            </a>
          <div className="navbt4">_____ </div>

            </>
          ) : (
            <>
              <a href="/login" className="navbt3">
                로그인
              </a>
              <a href="/register" className="navbt5">
                회원가입
              </a>
              <div className="navbt4">______ </div>
            </>
          )}
        </div>
       
      </div>
    </nav>
  );
};

export default NavBar;


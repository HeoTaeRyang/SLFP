import { useEffect } from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom"; // useParams 추가
import Home from "./Home";
import ShellRoute from "../ShellRoute";
import Admin from "./Admin";
import Findlike from "./Findlike";
import Login from "./Login";
import Register from "./Register";
import FreePost from "./FreePost"; // Free 글 목록 페이지
import FreeWriting from "./FreeWriting"; // Free 글 작성 페이지
import FreeLook from "./FreeLook"; // Free 글 상세 페이지
import GameLast from './GameLast';//경기 결과
import GameRanking from './GameRanking';//순위
import Coaches from './Coaches';
import Pitchers from "./Pitchers";
import Batters from "./Batters";
import MatchPlayer from "./MatchPlayer";

function App() {
  const isLoggedIn = !!localStorage.getItem('userid');

  useEffect(() => {
    document.title = "SLFP"; // 모든 페이지에서 동일한 제목 설정
  }, []);

  return (
    <Routes>
      {/* 로그인, 회원가입 페이지는 네비게이션 바가 없음 */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />

      {/* 네비게이션 바가 필요한 페이지 */}
      <Route element={<ShellRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/findlike" element={<Findlike />} />
        <Route path="/gamelast" element={<GameLast />} />
        {/* <Route path="/gamenext" element={<GameNext />} /> */}
        <Route path="/gameranking" element={<GameRanking />} />
        <Route path="/players/coaches" element={<Coaches />} />
        <Route path="/players/pitchers" element={<Pitchers />} />
        <Route path="/players/batters" element={<Batters />} />
        <Route path="/matchplayer" element={<MatchPlayer />} />

       {/* Free 관련 라우트 */}
       <Route path="/free/post" element={<FreePost />} />
        <Route path="/free/writing" element={<FreeWriting />} />
        <Route path="/free/:id" element={<FreeLookWithParams />} />

      </Route>
    </Routes>
  );
}

// FreeLookWithParams 컴포넌트: URL에서 id 값을 받아 FreeLook에 전달
const FreeLookWithParams = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 추출
  const postId = parseInt(id || "0", 10); // id를 숫자로 변환

  return <FreeLook postId={postId} />; // postId를 FreeLook에 전달
}

export default App;

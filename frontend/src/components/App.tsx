import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "./Home";
import ShellRoute from "../ShellRoute";
import Admin from "./Admin";
import Findlike from "./Findlike";
import Login from "./Login";
import Register from "./Register";
import FreePost from "./FreePost";
import FreeWriting from "./FreeWriting";
import FreeLook from "./FreeLook";
import GameLast from './GameLast';
import GameRanking from './GameRanking';
import GameDetail from './GameDetail'; // 새로운 컴포넌트 추가
import GamePlayer from './GamePlayer'; // 새로운 컴포넌트 추가
import Coaches from './Coaches';
import Pitchers from "./Pitchers";
import Batters from "./Batters";
import MatchPlayer from "./MatchPlayer";
import MyPage from "./Mypage";


function App() {
  const isLoggedIn = !!localStorage.getItem('userid');

  useEffect(() => {
    document.title = "SLFP";
  }, []);

  return (
    <Routes>
      {/* 로그인, 회원가입 페이지 */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />

      {/* 네비게이션 바가 필요한 페이지 */}
      <Route element={<ShellRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/findlike" element={<Findlike />} />
        <Route path="/gamelast" element={<GameLast />} />
        <Route path="/gameranking" element={<GameRanking />} />
        <Route path="/players/coaches" element={<Coaches />} />
        <Route path="/players/pitchers" element={<Pitchers />} />
        <Route path="/players/batters" element={<Batters />} />
        <Route path="/matchplayer" element={<MatchPlayer />} />
        <Route path="/mypage" element={<MyPage />} />


        

        {/* 동적 날짜 및 팀 라우트 */}
        <Route path="/gameplayer/:year/:month/:day/:homeTeam/:awayTeam/:dh" element={<GameDetailsWithParams />} />
        <Route path="/gamedetail/:year/:month/:day" element={<GamePlayer/>}/>

        {/* Free 관련 라우트 */}
        <Route path="/free/post" element={<FreePost />} />
        <Route path="/free/writing" element={<FreeWriting />} />
        <Route path="/free/:id" element={<FreeLookWithParams />} />
        
      </Route>
    </Routes>
  );
}

// 동적 날짜 및 팀 라우트 처리
const GameDetailsWithParams = () => {
  const { year, month, day, homeTeam, awayTeam } = useParams();
  const formattedDate = `${year}-${month}-${day}`; // 형식을 yyyy-mm-dd로 변환
  return <GameDetail date={formattedDate} homeTeam={homeTeam} awayTeam={awayTeam} />;
};

// FreeLookWithParams 컴포넌트
const FreeLookWithParams = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || "0", 10);
  return <FreeLook postId={postId} />;
};

export default App;

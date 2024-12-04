import { Routes, Route, Navigate, useParams } from 'react-router-dom'; // useParams 추가
import NavBar from './components/NavBar'; // 네비게이션바 컴포넌트
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import FreePost from './components/FreePost'; // 글 목록 페이지
import FreeWriting from './components/FreeWriting'; // 글 작성 페이지
import FreeLook from './components/FreeLook'; // 글 상세 페이지
import FindLike from './components/Findlike';//닮은꼴 찾기
import GameLast from './components/GameLast';//경기 결과
import GameRanking from './components/GameRanking';//순위
import Coaches from './components/Coaches';
import Pitchers from './components/Pitchers';
import Batters from './components/Batters';

// ShellRoute 컴포넌트: 네비게이션 바와 콘텐츠를 공통 레이아웃으로 설정
const ShellRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="content">{children}</div>
    </>
  );
};

// FreeLookWithParams 컴포넌트: URL의 id 값을 받아서 FreeLook 컴포넌트에 전달
const FreeLookWithParams = () => {
  const { id } = useParams<{ id: string }>(); // URL의 id 값 추출
  const postId = parseInt(id || "0", 10); // 문자열을 숫자로 변환
  return <FreeLook postId={postId} />;
};

function App() {
  return (
    <Routes>
      {/* 로그인 및 회원가입 페이지는 네비게이션바 없이 */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 나머지 페이지는 네비게이션바 포함 */}
      <Route
        path="/"
        element={
          <ShellRoute>
            <Home />
          </ShellRoute>
        }
      />

      <Route
        path="/findlike"
        element={
          <ShellRoute>
            <FindLike />
          </ShellRoute>
        }
      />

<Route
        path="/gamelast"
        element={
          <ShellRoute>
            <GameLast />
          </ShellRoute>
        }
      />

<Route
        path="/gameranking"
        element={
          <ShellRoute>
            <GameRanking />
          </ShellRoute>
        }
      />

<Route
        path="/players/coaches"
        element={
          <ShellRoute>
            <Coaches />
          </ShellRoute>
        }
      />

<Route
        path="/players/pitchers"
        element={
          <ShellRoute>
            <Pitchers />
          </ShellRoute>
        }
      />

<Route
        path="/players/batters"
        element={
          <ShellRoute>
            <Batters />
          </ShellRoute>
        }
      />

      

      {/* Free 관련 라우트 */}
      <Route
        path="/free/:id"
        element={
          <ShellRoute>
            <FreeLookWithParams />
          </ShellRoute>
        }
      />
      <Route
        path="/free/post"
        element={
          <ShellRoute>
            <FreePost />
          </ShellRoute>
        }
      />
      <Route
        path="/free/writing"
        element={
          <ShellRoute>
            <FreeWriting />
          </ShellRoute>
        }
      />
      
    </Routes>
  );
}

export default App;

// shellroute.tsx
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Admin from "./components/Admin";
import NavBar from "./components/NavBar";
import Findlike from "./components/Findlike";

const ShellRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="content">{children}</div>
    </>
  );
};

function App() {
  return (
    <Routes>
      {/* 로그인 및 회원가입 페이지는 네비게이션바 없이 */}
      <Route path="/admin" element={<Admin />} />

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
            <Findlike />
          </ShellRoute>
        }
      />
    </Routes>
  );
}

export default App;
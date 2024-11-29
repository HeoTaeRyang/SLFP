import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ShellRoute from "../ShellRoute";
import Admin from "./Admin";
import Findlike from "./Findlike";
import Login from "./Login";
import Register from "./Register";

function App() {
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
      </Route>
    </Routes>
  );
}

export default App;

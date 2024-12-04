import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token); // 토큰 저장
        localStorage.setItem('userId', formData.id); // 사용자 아이디 저장
        navigate('/');
      } else {
        setError(data.error || '로그인에 실패했습니다.');
      }
    } catch (error) {
      setError('서버와의 통신에 실패했습니다.');
    }
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img src="login.png" alt="Login Illustration" />
      </div>
      <div className="login-container">
        <h1>로그인</h1>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="id"
              placeholder="아이디"
              value={formData.id}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">SIGN IN</button>
          </form>
          <p>
            <a href="/register">회원가입</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

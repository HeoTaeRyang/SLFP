import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id,
          password: formData.password,
          username: formData.username,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate('/login');
      } else {
        setError(data.error || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      setError('서버와의 통신에 실패했습니다.');
    }
  };

  return (
    <div className="register-page">
      <div className="image-container">
        <img src="register.png" alt="Register Illustration" />
      </div>
      <div className="register-container">
        <h1>회원가입</h1>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="이름"
              value={formData.username}
              onChange={handleChange}
            />
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">REGISTER</button>
          </form>
          <p>
            <a href="/login">로그인</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

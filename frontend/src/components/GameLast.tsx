import { useNavigate } from 'react-router-dom';  // useHistory에서 useNavigate로 변경
import React, { useState } from 'react';

const GameLast = () => {
  const navigate = useNavigate(); // useNavigate 사용
  const [selectedDate, setSelectedDate] = useState<string>('');

  // 홈으로 이동하는 함수
  const goHome = () => {
    navigate('/'); // navigate 함수로 홈 페이지로 이동
  };

  // 날짜 선택 핸들러 (예시)
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <h1>Game Last Page</h1>

      {/* 달력 부분 */}
      <div>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {/* 버튼 */}
      <button onClick={goHome}>홈으로</button>
      <button onClick={() => setSelectedDate('')}>다시 하기</button>
    </div>
  );
};

export default GameLast;

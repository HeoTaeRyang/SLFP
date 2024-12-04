import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/GameLast.css";
import axios from 'axios';

type Game = {
  day: string;
  time: string;
  stadium: string;
  status: string;
  home_team: string;
  away_team: string;
  home_result: string;
  home_score: string;
  away_score: string;
  home_pitcher: string;
  away_pitcher: string;
};

const GameLast = () => {
  const navigate = useNavigate();
  
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(3); // 초기 월은 11월로 설정
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  //백 연결 코드임 요거 써서 테스트 해보면 될듯 위에 Games도 만들어뒀음
  // const [games, setGames] = useState<Game | null>(null);

  // const fetchGames = async () => {
  //   try {
  //     const requestData = {
  //       year: year,
  //       month: month,
  //     };

  //     const response = await axios.post(
  //       'http://localhost:5000/gameResultMonth', // 서버에서 데이터를 가져오는 API
  //       requestData,
  //       { headers: { 'Content-Type': 'application/json' } }
  //     );
  //     setGames(response.data.games);
  //   } catch (error) {
  //     console.error('게시글 목록을 가져오는 중 오류 발생:', error);
  //   }
  // };


  // 날짜 선택 핸들러
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    navigate(`/gamelast/${year}/${month}/${date}`); // 날짜에 맞춰 이동
  };

  // 달 변경 함수
  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (month === 1) {
        setMonth(12);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 12) {
        setMonth(1);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  // 날짜 계산 함수 (해당 월의 마지막 날짜 구하기)
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(month, year);

  // 날짜 배열을 7일씩 끊어주는 함수
  const generateCalendar = () => {
    const firstDay = new Date(year, month - 1, 1).getDay(); // 해당 월의 첫 번째 날이 무슨 요일인지
    const calendar: string[] = [];

    // 첫 번째 주의 빈 칸 추가
    for (let i = 0; i < firstDay; i++) {
      calendar.push('');
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day.toString());
    }

    // 7일씩 끊어서 주별로 날짜를 반환
    const weeks: string[][] = [];
    for (let i = 0; i < calendar.length; i += 7) {
      weeks.push(calendar.slice(i, i + 7));
    }

    // 마지막 주가 7일 미만일 경우 빈 칸 추가
    const lastWeek = weeks[weeks.length - 1];
    while (lastWeek.length < 7) {
      lastWeek.push('');
    }

    return weeks;
  };

  const weeks = generateCalendar();

  return (
    <div className="calendar-container">
      <div className="cal-title">
      <h1>경기 일정</h1>
      </div>
      <div className="free-container-underbox-1"></div>

      {/* 달 변경 버튼 */}
      <div className="month-change-btns">
        <button onClick={() => handleMonthChange('prev')} className="month-btn">◀</button>
        <span>{year}년 {month}월</span>
        <button onClick={() => handleMonthChange('next')} className="month-btn">▶</button>
      </div>

      {/* 달력 */}
      <div className="calendar">
        <div className="calendar-header">
          <div>SUN</div>
          <div>MON</div>
          <div>TUE</div>
          <div>WED</div>
          <div>THU</div>
          <div>FRI</div>
          <div>SAT</div>
        </div>

        <div className="calendar-body">
          {weeks.map((week, index) => (
            <div key={index} className="calendar-row">
              {week.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-cell ${day ? 'active' : ''}`}
                  onClick={() => day && handleDateChange(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameLast;

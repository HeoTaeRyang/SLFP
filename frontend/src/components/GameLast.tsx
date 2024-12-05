import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/GameLast.css";

const GameLast = () => {
  const navigate = useNavigate();

  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(3); // 초기 월은 11월로 설정
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [games, setGames] = useState<any[]>([]); // 경기 데이터
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  // 현재 날짜를 가져오는 함수
  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  };

  // 게임 데이터를 가져오는 useEffect
  useEffect(() => {
    if (!year || !month) return; // 연도와 월이 없다면 API 호출하지 않음
    axios.post('http://localhost:5000/gameResultMonth', { year, month })
      .then(response => {
        setGames(response.data.games); // 경기를 가져와서 상태에 저장
        setLoading(false); // 로딩 완료
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching game results:', err);
      });
  }, [year, month]);

  // 날짜 선택 핸들러
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    navigate(`/gamedetail/${year}/${month}/${date}`); // 날짜에 맞춰 이동
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

  // 해당 날짜에 경기가 있는지 확인하고 점수 표시
  const getGameForDate = (date: string) => {
    const gamesForDate = games.filter((game) => game.day === date); // 조건에 맞는 모든 경기 가져오기
    if (gamesForDate.length === 0) return null;
  
    // 현재 날짜와 비교
    const gameDate = new Date(`${year}-${month}-${date}`);
    const currentDate = new Date(getCurrentDate());
  
    if (gameDate > currentDate) {
      // 미래의 경기라면 홈팀과 어웨이팀만 표시
      return gamesForDate.map(
        (game) => `${game.home_team}:${game.away_team}`
      ).join("\n"); // 여러 경기 정보를 줄바꿈으로 구분
    } else {
      // 과거 경기라면 점수와 상태 포함
      return gamesForDate.map((game) => {
        if (game.status === '취소') {
          return `${game.home_team}:${game.away_team} (취소)`;
        } else {
          return `${game.home_team} ${game.home_score} - ${game.away_score} ${game.away_team}`;
        }
      }).join("\n"); // 여러 경기 정보를 줄바꿈으로 구분
    }
  };

  const isGameDay = (day: string) => {
    return games.some((game) => game.day === day); // 해당 날짜에 경기가 있는지 확인
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  return (
    <div className="calendar-container">
      <div className="cal-title">
        <h1>경기 일정</h1>
      </div>

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
                  className={`calendar-cell ${day ? 'active' : ''} ${!isGameDay(day) ? 'disabled' : ''}`}
                  onClick={() => day && isGameDay(day) && handleDateChange(day)}
                >
                  {day}
                  {day && (
                    <div className="game-score">
                      {getGameForDate(day) ? getGameForDate(day) : '경기 없음'}
                    </div>
                  )}
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

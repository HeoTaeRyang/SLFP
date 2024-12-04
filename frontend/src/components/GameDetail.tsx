import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/GameDetail.css";

interface Game {
  date: string;
  time: string;
  stadium: string;
  status: string;
  home_team: string;
  away_team: string;
  home_result: string;
  home_score: number;
  away_score: number;
  home_pitcher: string;
  away_pitcher: string;
}

const GameDetail = () => {
  const { year, month, day } = useParams<{ year: string; month: string; day: string }>();
  const [games, setGames] = useState<Game[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.post('/gameResultMonth', {
          year: parseInt(year || '2024'),
          month: parseInt(month || '1'),
        });
        
        const filteredGames = response.data.games.filter((game: Game) => game.date === `${year}-${month}-${day}`);
        setGames(filteredGames);
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('경기 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchGameDetails();
  }, [year, month, day]);

  if (error) {
    return <div className="game-detail-container error">{error}</div>;
  }

  return (
    <div className="game-detail-container">
      <h1>{`${year}년 ${month}월 ${day}일 경기 결과`}</h1>
      {games ? (
        games.length > 0 ? (
          <div className="game-list">
            {games.map((game, index) => (
              <div key={index} className="game-card">
                <p><strong>경기 날짜:</strong> {game.date}</p>
                <p><strong>경기 시간:</strong> {game.time}</p>
                <p><strong>구장:</strong> {game.stadium}</p>
                <p><strong>경기 상태:</strong> {game.status}</p>
                <p><strong>홈 팀:</strong> {game.home_team} ({game.home_score})</p>
                <p><strong>원정 팀:</strong> {game.away_team} ({game.away_score})</p>
                <p><strong>홈 투수:</strong> {game.home_pitcher}</p>
                <p><strong>원정 투수:</strong> {game.away_pitcher}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>해당 날짜에 경기가 없습니다.</p>
        )
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default GameDetail;
// GameDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/GameDetail.css";

interface Game {
  day: string;
  time: string;
  stadium: string;
  status: string;
  home_team: string;
  away_team: string;
  home_result: string;
  away_result: string;
  home_score: number;
  away_score: number;
  home_pitcher: string;
  away_pitcher: string;
}

const GameDetail: React.FC = () => {
  const { year, month, day } = useParams<{ year: string; month: string; day?: string }>();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!year || !month) return;

    const fetchGames = async () => {
      try {
        const response = await axios.post('http://localhost:5000/gameResultMonth', { year, month });
        setGames(response.data.games || []);
      } catch (err) {
        setError('Error fetching game results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [year, month]);

  const filteredGames = day
    ? games.filter((game) => game.day === day)
    : games;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="game-detail-container">
      <Link to="/gamelast">
        <button className="list-button">목록</button>
      </Link>
      <h2>{`${year}년 ${month}월${day ? ` ${day}일` : ''} 경기 결과`}</h2>
      <div className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => (
            <div
              key={index}
              className={`game-card ${game.status === '진행 중' ? 'ongoing' : 'finished'}`}
            >
              <div className="game-header">
                <span className="game-time">{game.time}</span>
                <span className="game-stadium">{game.stadium}</span>
              </div>
              <div className="game-teams">
                <Link
                  to={`/gameplayer/${year}/${month}/${day || ''}/${game.home_team}/${game.away_team}`}
                >
                  <span className="team-link">
                    {game.home_team} vs {game.away_team}
                  </span>
                </Link>
              </div>
              <div className="game-score">
                {game.status === '진행 중' ? (
                  <span className="status-ongoing">진행 중</span>
                ) : (
                  <>
                    <span className="home-score">{game.home_score}</span> -{' '}
                    <span className="away-score">{game.away_score}</span>
                  </>
                )}
              </div>
              <div className="game-pitchers">
                <span>
                  {game.home_pitcher} vs {game.away_pitcher}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>No games found for this day.</div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;

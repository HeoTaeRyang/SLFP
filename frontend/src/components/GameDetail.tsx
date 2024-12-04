// GameDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/GameDetail.css";

// Define the Game interface for TypeScript
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

const GameDetail = () => {
  const { year, month, day } = useParams(); // Get year, month, and day from URL params
  const [games, setGames] = useState<Game[]>([]); // Store game results
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(''); // Error state

  useEffect(() => {
    if (!year || !month) return; // Ensure year and month are available

    // Fetch game results for the specific month and year
    axios.post('http://localhost:5000/gameResultMonth', { year, month })
      .then(response => {
        setGames(response.data.games); // Update games state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(err => {
        setError('Error fetching game results');
        setLoading(false);
      });
  }, [year, month]); // Re-run the effect whenever year or month changes

  // Filter games by specific day if day param is present
  const filteredGames = day
    ? games.filter(game => game.day === day) // If day is present, filter by day
    : games; // Otherwise, return all games for the month

  if (loading) {
    return <div>Loading...</div>; // Show loading text while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return (
    <div className="game-detail-container">
      <a href="/gamelast">
        <button className="list-button">
          목록
        </button>
      </a>
      <h2>{year}년 {month}월 {day ? `${day}일` : ''} 경기 결과</h2>
      <div className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => (
            <div key={index} className={`game-card ${game.status === "진행 중" ? "ongoing" : "finished"}`}>
              <div className="game-header">
                <div className="game-time">{game.time}</div>
                <div className="game-stadium">{game.stadium}</div>
              </div>
              <div className="game-teams">
                {/* 팀 이름을 클릭하면 해당 경기의 선수 통계 페이지로 이동 */}
                <div>
                  <Link to={`/gameplayer/${year}/${month}/${day}/${game.home_team}/${game.away_team}`}>
                    <span className="team-link">
                      {game.home_team} vs {game.away_team}
                    </span>
                  </Link>
                </div>
              </div>
              <div className="game-score">
                {game.status === "진행 중" ? (
                  <span className="status-ongoing">진행 중</span>
                ) : (
                  <>
                    <span className="home-score">{game.home_score}</span> - <span className="away-score">{game.away_score}</span>
                  </>
                )}
              </div>
              <div className="game-pitchers">
                <span>{game.home_pitcher} vs {game.away_pitcher}</span>
              </div>
            </div>
          ))
        ) : (
          <div>No games found for this day.</div>
        )}
      </div>
    </div>
  );
}

export default GameDetail;
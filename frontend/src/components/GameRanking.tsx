import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/GameRanking.css";

interface Rank {
  rank: number;
  team: string;
  game: number;
  win: number;
  lose: number;
  draw: number;
  win_rate: number;
}

const GameRanking = () => {
  const [ranking, setRanking] = useState<Rank[]>([]);

  useEffect(() => {
    // 데이터 요청
    const fetchRanking = async () => {
      try {
        const response = await axios.post('http://localhost:5000/rank', {
          year: 2024, // 예시로 2024년 시즌을 요청
        });
        setRanking(response.data.ranking);
      } catch (error) {
        console.error('랭킹 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="ranking-container">
      <a href="/">
      <button className="list-button">
       홈으로
      </button>
      </a>
      <h1>2024 시즌 야구 구단 순위</h1>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>순위</th>
            <th>팀</th>
            <th>경기수</th>
            <th>승</th>
            <th>패</th>
            <th>무</th>
            <th>승률</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((team, index) => (
            <tr key={index}>
              <td>{team.rank}</td>
              <td>{team.team}</td>
              <td>{team.game}</td>
              <td>{team.win}</td>
              <td>{team.lose}</td>
              <td>{team.draw}</td>
              <td>{team.win_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default GameRanking;


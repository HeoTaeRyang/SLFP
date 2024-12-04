import React, { useEffect, useState } from 'react';
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

  // 더미 데이터
  const dummyData: Rank[] = [
    { rank: 1, team: "KIA", game: 144, win: 85, lose: 58, draw: 1, win_rate: 0.590 },
    { rank: 2, team: "삼성", game: 144, win: 82, lose: 60, draw: 2, win_rate: 0.570 },
    { rank: 3, team: "LG", game: 144, win: 79, lose: 63, draw: 2, win_rate: 0.550 },
    { rank: 4, team: "두산", game: 144, win: 75, lose: 67, draw: 2, win_rate: 0.520 },
    { rank: 5, team: "KT", game: 144, win: 72, lose: 70, draw: 2, win_rate: 0.500 },
    { rank: 6, team: "SSG", game: 144, win: 70, lose: 72, draw: 2, win_rate: 0.490 },
    { rank: 7, team: "NC", game: 144, win: 68, lose: 74, draw: 2, win_rate: 0.470 },
    { rank: 8, team: "한화", game: 144, win: 65, lose: 77, draw: 2, win_rate: 0.450 },
    { rank: 9, team: "롯데", game: 144, win: 60, lose: 82, draw: 2, win_rate: 0.420 },
    { rank: 10, team: "키움", game: 144, win: 55, lose: 87, draw: 2, win_rate: 0.380 },
  ];

  useEffect(() => {
    // 데이터를 더미로 설정
    setRanking(dummyData);
  }, []);

  // 최대값 계산
  const maxWin = Math.max(...ranking.map(team => team.win));
  const maxLose = Math.max(...ranking.map(team => team.lose));
  const maxWinRate = Math.max(...ranking.map(team => team.win_rate));

  return (
    <div className="ranking-container">
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
            <tr key={index} className={team.rank === 1 ? "gold" : team.rank === 2 ? "silver" : team.rank === 3 ? "bronze" : ""}>
              <td>{team.rank}</td>
              <td>{team.team}</td>
              <td>{team.game}</td>
              <td className={team.win === maxWin ? "highlight" : ""}>{team.win}</td>
              <td className={team.lose === maxLose ? "highlight" : ""}>{team.lose}</td>
              <td>{team.draw}</td>
              <td className={team.win_rate === maxWinRate ? "highlight" : ""}>{team.win_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameRanking;



{/* 백 연결되면 이걸로 바꾸면댐
  
import React, { useEffect, useState } from 'react';
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
        const response = await axios.post('/rank', {
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

  
  */}

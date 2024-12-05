import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/GamePlayer.css";
import axios from 'axios';

const GamePlayers = () => {
  const { year, month, day, homeTeam, awayTeam, dh } = useParams(); // URL 파라미터에서 year, month, day, teams를 가져오기
  const [homeBatters, setHomeBatter] = useState<any[]>([]); // 홈팀 선수 데이터
  const [awayBatters, setAwayBatters] = useState<any[]>([]); // 어웨이팀 선수 데이터
  const [homePitchers, setHomePitcher] = useState<any[]>([]); // 어웨이팀 선수 데이터
  const [awayPitchers, setAwayPitcher] = useState<any[]>([]); // 어웨이팀 선수 데이터

  useEffect(() => {
    // 선수 데이터를 서버에서 가져오는 부분 (API 호출)
    const fetchPlayers = async () => {
      try {
        const requestData = {
          year: year,
          month: month,
          day: day,
          home_team: homeTeam,
          away_team: awayTeam,
          dh: dh
        };

        const response = await axios.post(
          'http://localhost:5000/gameResultDetail',
          requestData,
          { headers: { 'Content-Type': 'application/json' } }
        );

        console.log(response.data.home_batters)
        
        setHomeBatter(response.data.home_batters)
        setAwayBatters(response.data.away_batters)
        setHomePitcher(response.data.home_pitchers)
        setAwayPitcher(response.data.away_pitchers)
        

      } catch (error) {
        console.error("선수 데이터를 가져오는 데 실패했습니다.", error);
      }

    };

    fetchPlayers();
  }, [year, month, day, homeTeam, awayTeam]); // 의존성 배열에 필요한 값들

  return (
    <div className="game-players-container">
      <h2>{homeTeam} 타자기록</h2>
      <div className="divider"></div> 
      <div className="game-players-table">
        <table>
          <thead>
            <tr className="header-row">
              <th>{homeTeam}</th> 
              <th>타수</th>
              <th>득점</th>
              <th>안타</th>
              <th>타점</th>
              <th>홈런</th>
              <th>볼넷</th>
              <th>삼진</th>
              <th>타율</th>
            </tr>
          </thead>
          <tbody>
            {homeBatters.length > 0 && homeBatters.map((player, index) => (
              <tr key={index}>
                <td>
                  {player.bo === "교체" ? (
                    <div className="player-extra">^교체</div>
                  ) : (
                    <div className="player-extra">{player.bo}번 타자</div>
                  )}
                  {player.name}
                  <div className="player-position">({player.position})</div>
                </td>
                <td>{player.ab}</td>
                <td>{player.r}</td>
                <td>{player.h}</td>
                <td>{player.rbi}</td>
                <td>{player.hr}</td>
                <td>{player.bb}</td>
                <td>{player.k}</td>
                <td>{player.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{awayTeam} 타자기록</h2>
      <div className="divider"></div> 
      <div className="game-players-table">
        <table>
          <thead>
            <tr className="header-row">
              <th>{awayTeam}</th> 
              <th>타수</th>
              <th>득점</th>
              <th>안타</th>
              <th>타점</th>
              <th>홈런</th>
              <th>볼넷</th>
              <th>삼진</th>
              <th>타율</th>
            </tr>
          </thead>
          <tbody>
            {awayBatters.length > 0 && awayBatters.map((player, index) => (
              <tr key={index}>
                <td>
                  {player.bo === "교체" ? (
                    <div className="player-extra">^교체</div>
                  ) : (
                    <div className="player-extra">{player.bo}번 타자</div>
                  )}
                  {player.name}
                  <div className="player-position">({player.position})</div>
                </td>
                <td>{player.ab}</td>
                <td>{player.r}</td>
                <td>{player.h}</td>
                <td>{player.rbi}</td>
                <td>{player.hr}</td>
                <td>{player.bb}</td>
                <td>{player.k}</td>
                <td>{player.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>{homeTeam} 투수기록</h2>
      <div className="divider"></div> 
      <div className="game-players-table">
        <table>
          <thead>
            <tr className="header-row">
              <th>{homeTeam}</th> 
              <th>이닝</th>
              <th>피안타</th>
              <th>실점</th>
              <th>자책</th>
              <th>4사구</th>
              <th>삼진</th>
              <th>피홈런</th>
              <th>타자</th>
              <th>타수</th>
              <th>투구수</th>
              <th>평균자책</th>
            </tr>
          </thead>
          <tbody>
            {homePitchers.length > 0 && homePitchers.map((player, index) => (
              <tr key={index}>
                <td>
                  {player.whs ? (
                    <div className="player-extra">{player.name} {player.whs}</div>
                  ) : (
                    <div className="player-extra">{player.name}</div>
                  )}
                </td>
                <td>{player.ip}</td>
                <td>{player.h}</td>
                <td>{player.r}</td>
                <td>{player.er}</td>
                <td>{player.bb}</td>
                <td>{player.k}</td>
                <td>{player.hr}</td>
                <td>{player.bf}</td>
                <td>{player.ab}</td>
                <td>{player.p}</td>
                <td>{player.era}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>{homeTeam} 투수기록</h2>
      <div className="divider"></div> 
      <div className="game-players-table">
        <table>
          <thead>
            <tr className="header-row">
              <th>{homeTeam}</th> 
              <th>이닝</th>
              <th>피안타</th>
              <th>실점</th>
              <th>자책</th>
              <th>4사구</th>
              <th>삼진</th>
              <th>피홈런</th>
              <th>타자</th>
              <th>타수</th>
              <th>투구수</th>
              <th>평균자책</th>
            </tr>
          </thead>
          <tbody>
            {awayPitchers.length > 0 && awayPitchers.map((player, index) => (
              <tr key={index}>
                <td>
                  {player.whs ? (
                    <div className="player-extra">{player.name} {player.whs}</div>
                  ) : (
                    <div className="player-extra">{player.name}</div>
                  )}
                </td>
                <td>{player.ip}</td>
                <td>{player.h}</td>
                <td>{player.r}</td>
                <td>{player.er}</td>
                <td>{player.bb}</td>
                <td>{player.k}</td>
                <td>{player.hr}</td>
                <td>{player.bf}</td>
                <td>{player.ab}</td>
                <td>{player.p}</td>
                <td>{player.era}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default GamePlayers;

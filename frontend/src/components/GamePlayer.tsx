import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/GamePlayer.css";

const GamePlayers = () => {
  const { year, month, day, homeTeam, awayTeam } = useParams(); // URL 파라미터에서 year, month, day, teams를 가져오기
  const [homePlayers, setHomePlayers] = useState<any[]>([]); // 홈팀 선수 데이터
  const [awayPlayers, setAwayPlayers] = useState<any[]>([]); // 어웨이팀 선수 데이터

  useEffect(() => {
    // 더미 데이터를 사용하여 선수 데이터를 설정
    const fetchPlayers = async () => {
      const homeDummyData = [
        {
          name: '김ㄴㄴ',
          position: '타자',
          at_bats: 5,
          runs: 1,
          hits: 3,
          rbis: 2,
          home_runs: 1,
          walks: 0,
          strikeouts: 1,
          stolen_bases: 1,
          avg: .600
        },
        {
          name: '박ㅎㅎ',
          position: '타자',
          at_bats: 4,
          runs: 2,
          hits: 2,
          rbis: 3,
          home_runs: 1,
          walks: 1,
          strikeouts: 0,
          stolen_bases: 0,
          avg: .500
        },
        {
          name: '샵ㄱㄱ',
          position: '타자',
          at_bats: 4,
          runs: 0,
          hits: 1,
          rbis: 0,
          home_runs: 0,
          walks: 1,
          strikeouts: 2,
          stolen_bases: 1,
          avg: .250
        },
        {
          name: '솜ㅂㅂ',
          position: '타자',
          at_bats: 5,
          runs: 1,
          hits: 2,
          rbis: 1,
          home_runs: 0,
          walks: 0,
          strikeouts: 1,
          stolen_bases: 0,
          avg: .400
        },
      ];
      const awayDummyData = [
        {
          name: '지ㅔㅔ',
          position: '타자',
          at_bats: 4,
          runs: 0,
          hits: 1,
          rbis: 0,
          home_runs: 0,
          walks: 2,
          strikeouts: 2,
          stolen_bases: 1,
          avg: .250
        },
        {
          name: '강ㅇㅇ',
          position: '타자',
          at_bats: 5,
          runs: 1,
          hits: 2,
          rbis: 1,
          home_runs: 0,
          walks: 0,
          strikeouts: 1,
          stolen_bases: 0,
          avg: .400
        },
        {
          name: '천ㅂㅂ',
          position: '타자',
          at_bats: 4,
          runs: 1,
          hits: 3,
          rbis: 1,
          home_runs: 1,
          walks: 1,
          strikeouts: 3,
          stolen_bases: 2,
          avg: .750
        },
        {
          name: '서ㅣㅣ',
          position: '타자',
          at_bats: 3,
          runs: 2,
          hits: 2,
          rbis: 2,
          home_runs: 1,
          walks: 0,
          strikeouts: 0,
          stolen_bases: 1,
          avg: .667
        },
      ];

      setHomePlayers(homeDummyData); // 홈팀 선수 데이터 업데이트
      setAwayPlayers(awayDummyData); // 어웨이팀 선수 데이터 업데이트
    };

    fetchPlayers();
  }, [year, month, day, homeTeam, awayTeam]); // 의존성 배열에 필요한 값들

  return (
    <div className="game-players-container">
      <div className="divider-0"></div> {/* 굵은 검은 선 */}
      <h2>타자기록</h2>
      <div className="divider"></div> {/* 굵은 검은 선 */}

      {/* 홈팀 선수 표 */}
      <div className="game-players-table">
        <table>
          <thead>
            <tr className="header-row">
              <th>{homeTeam}</th> {/* 홈팀 이름 */}
              <th>타수</th>
              <th>득점</th>
              <th>안타</th>
              <th>타점</th>
              <th>홈런</th>
              <th>볼넷</th>
              <th>삼진</th>
              <th>도루</th>
              <th>타율</th>
            </tr>
          </thead>
          <tbody>
            {homePlayers.length > 0 && homePlayers.map((player, index) => (
              <tr key={index}>
                <td>
                  {player.name}
                  <div className="player-position">({player.position})</div> {/* 직책을 작은 글씨로 표시 */}
                </td>
                <td>{player.at_bats}</td>
                <td>{player.runs}</td>
                <td>{player.hits}</td>
                <td>{player.rbis}</td>
                <td>{player.home_runs}</td>
                <td>{player.walks}</td>
                <td>{player.strikeouts}</td>
                <td>{player.stolen_bases}</td>
                <td>{player.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divider"></div> {/* 또 다른 굵은 검은 선 */}

      {/* 어웨이팀 선수 표 */}
      <div className="game-players-table">
        <table>
          <thead>
            <tr className="header-row">
              <th>{awayTeam}</th> {/* 어웨이팀 이름 */}
              <th>타수</th>
              <th>득점</th>
              <th>안타</th>
              <th>타점</th>
              <th>홈런</th>
              <th>볼넷</th>
              <th>삼진</th>
              <th>도루</th>
              <th>타율</th>
            </tr>
          </thead>
          <tbody>
            {awayPlayers.length > 0 && awayPlayers.map((player, index) => (
              <tr key={index}>
                <td>
                  {player.name}
                  <div className="player-position">({player.position})</div> {/* 직책을 작은 글씨로 표시 */}
                </td>
                <td>{player.at_bats}</td>
                <td>{player.runs}</td>
                <td>{player.hits}</td>
                <td>{player.rbis}</td>
                <td>{player.home_runs}</td>
                <td>{player.walks}</td>
                <td>{player.strikeouts}</td>
                <td>{player.stolen_bases}</td>
                <td>{player.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GamePlayers;



/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/GamePlayer.css";

const GamePlayers = () => {
  const { year, month, day, homeTeam, awayTeam } = useParams(); // URL 파라미터에서 year, month, day, teams를 가져오기
  const [homePlayers, setHomePlayers] = useState<any[]>([]); // 홈팀 선수 데이터
  const [awayPlayers, setAwayPlayers] = useState<any[]>([]); // 어웨이팀 선수 데이터

  useEffect(() => {
    // 선수 데이터를 서버에서 가져오는 부분 (API 호출)
    const fetchPlayers = async () => {
      // 예시 API 호출 (백엔드 API 주소로 교체 필요)
      try {
        const responseHome = await fetch(`/api/players/${homeTeam}`);
        const dataHome = await responseHome.json();
        setHomePlayers(dataHome);

        const responseAway = await fetch(`/api/players/${awayTeam}`);
        const dataAway = await responseAway.json();
        setAwayPlayers(dataAway);
      } catch (error) {
        console.error("선수 데이터를 가져오는 데 실패했습니다.", error);
      }

      // 더미 데이터 제거 및 주석처리
      // const homeDummyData = [
      //   {
      //     name: '홈팀 선수1',
      //     position: '투수',
      //     at_bats: 5,
      //     runs: 1,
      //     hits: 3,
      //     rbis: 2,
      //     home_runs: 1,
      //     walks: 0,
      //     strikeouts: 1,
      //     stolen_bases: 1,
      //     avg: .600
      //   },
      //   {
      //     name: '홈팀 선수2',
      //     position: '타자',
      //     at_bats: 4,
      //     runs: 2,
      //     hits: 2,
      //     rbis: 3,
      //     home_runs: 1,
      //     walks: 1,
      //     strikeouts: 0,
      //     stolen_bases: 0,
      //     avg: .500
      //   },
      //   {
      //     name: '홈팀 선수3',
      //     position: '외야수',
      //     at_bats: 4,
      //     runs: 0,
      //     hits: 1,
      //     rbis: 0,
      //     home_runs: 0,
      //     walks: 1,
      //     strikeouts: 2,
      //     stolen_bases: 1,
      //     avg: .250
      //   },
      //   {
      //     name: '홈팀 선수4',
      //     position: '1루수',
      //     at_bats: 5,
      //     runs: 1,
      //     hits: 2,
      //     rbis: 1,
      //     home_runs: 0,
      //     walks: 0,
      //     strikeouts: 1,
      //     stolen_bases: 0,
      //     avg: .400
      //   },
      // ];
      // const awayDummyData = [
      //   {
      //     name: '어웨이팀 선수1',
      //     position: '외야수',
      //     at_bats: 4,
      //     runs: 0,
      //     hits: 1,
      //     rbis: 0,
      //     home_runs: 0,
      //     walks: 2,
      //     strikeouts: 2,
      //     stolen_bases: 1,
      //     avg: .250
      //   },
      //   {
      //     name: '어웨이팀 선수2',
      //     position: '1루수',
      //     at_bats: 5,
      //     runs: 1,
      //     hits: 2,
      //     rbis: 1,
      //     home_runs: 0,
      //     walks: 0,
      //     strikeouts: 1,
      //     stolen_bases: 0,
      //     avg: .400
      //   },
      //   {
      //     name: '어웨이팀 선수3',
      //     position: '투수',
      //     at_bats: 4,
      //     runs: 1,
      //     hits: 3,
      //     rbis: 1,
      //     home_runs: 1,
      //     walks: 1,
      //     strikeouts: 3,
      //     stolen_bases: 2,
      //     avg: .750
      //   },
      //   {
      //     name: '어웨이팀 선수4',
      //     position: '타자',
      //     at_bats: 3,
      //     runs: 2,
      //     hits: 2,
      //     rbis: 2,
      //     home_runs: 1,
      //     walks: 0,
      //     strikeouts: 0,
      //     stolen_bases: 1,
      //     avg: .667
      //   },
      // ];

      // setHomePlayers(homeDummyData); // 홈팀 선수 데이터 업데이트
      // setAwayPlayers(awayDummyData); // 어웨이팀 선수 데이터 업데이트
    };

    fetchPlayers();
  }, [year, month, day, homeTeam, awayTeam]); // 의존성 배열에 필요한 값들

  return (
    <div className="game-players-container">
      <h2>타자기록</h2>
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
              <th>도루</th>
              <th>타율</th>
            </tr>
          </thead>
          <tbody>
            {homePlayers.length > 0 && homePlayers.map((player, index) => (
              <tr key={index}>
                <td>
                  {player.name}
                  <div className="player-position">({player.position})</div> 
                </td>
                <td>{player.at_bats}</td>
                <td>{player.runs}</td>
                <td>{player.hits}</td>
                <td>{player.rbis}</td>
                <td>{player.home_runs}</td>
                <td>{player.walks}</td>
                <td>{player.strikeouts}</td>
                <td>{player.stolen_bases}</td>
                <td>{player.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divider"></div> 

     
      <div className="game-players-table">
        <table>
          <thead>
            <tr className="header-row">
              <th>{awayTeam}</th> 
              <th>득점</th>
              <th>안타</th>
              <th>타점</th>
              <th>홈런</th>
              <th>볼넷</th>
              <th>삼진</th>
              <th>도루</th>
              <th>타율</th>
            </tr>
          </thead>
          <tbody>
            {awayPlayers.length > 0 && awayPlayers.map((player, index) => (
              <tr key={index}>
                <td>
                  {player.name}
                  <div className="player-position">({player.position})</div>
                </td>
                <td>{player.at_bats}</td>
                <td>{player.runs}</td>
                <td>{player.hits}</td>
                <td>{player.rbis}</td>
                <td>{player.home_runs}</td>
                <td>{player.walks}</td>
                <td>{player.strikeouts}</td>
                <td>{player.stolen_bases}</td>
                <td>{player.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GamePlayers;

*/

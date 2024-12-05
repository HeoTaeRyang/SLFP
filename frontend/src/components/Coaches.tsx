import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Coaches.css";

interface Player {
    name: string;
    number: string;
    roll: string;
    photo: string | null;
  }

const Coaches = () => {
    const navigate = useNavigate();
    
    const [players, setPlayers] = useState<{ [key: string]: Player[] }>({
        감독: [],
        "1군": [],
        퓨처스팀: [],
      });
    
      useEffect(() => {
        fetchPlayers();
      }, []);
    
      const fetchPlayers = async () => {
        try {
          const types = ['감독', '1군', '퓨처스팀'];
          const fetchedPlayers: { [key: string]: Player[] } = {};
    
          for (const type of types) {
            const response = await axios.post('http://localhost:5000/players', { type });
            fetchedPlayers[type] = response.data.player;
          }
    
          setPlayers(fetchedPlayers);
        } catch (error) {
          console.error("Error fetching players:", error);
        }
      };
    
      const renderPlayerCards = (playerList: Player[]) => {
        return (
          <div className="players-grid">
            {playerList.map((player, index) => (
              <div key={index} className="player-card">
                <div className="player-photo">
                  {player.photo ? (
                    <img src={`data:image/jpeg;base64,${player.photo}`} alt={player.name} />
                  ) : (
                    <div className="no-photo">No Photo</div>
                  )}
                </div>
                <div className="player-info">
                  <p className="player-roll">{player.roll}</p>
                  <p className="player-number">{player.number}</p>
                  <p className="player-name">{player.name}</p>
                </div>
              </div>
            ))}
          </div>
        );
      };
    
      return (
        <div className="coaches-container">
          <div className="cal-title">
            <h1>코칭 스텝</h1>
          </div>
          
          <div className="section">
            <h2>감독</h2>
            {renderPlayerCards(players.감독)}
          </div>
    
          <div className="section">
            <h2>1군 The First String</h2>
            {renderPlayerCards(players["1군"])}
          </div>
    
          <div className="section">
            <h2>퓨처스팀 The Second String</h2>
            {renderPlayerCards(players.퓨처스팀)}
          </div>
        </div>
      );
    };
    
    export default Coaches;
import React, { useState } from 'react';
import '../styles/MatchPlayer.css';

const MatchPlayer = () => {
    const [playerData, setPlayerData] = useState<any>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const fetchPlayerData = async () => {
        try {
            const response = await fetch('http://localhost:5000/matchPlayer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPlayerData(data.player);
                setSelectedPhoto(data.player[0]?.photo);
            } else {
                console.error('Failed to fetch player data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAnswer = (name: string) => {
        if (playerData && playerData[0]?.name === name) {
            alert('정답입니다!');
        } else {
            alert('오답입니다!');
        }
    };

    return (
        <div className="match-player-container">
            <h1>선수 이미지 맞추기</h1>
            <hr className="divider" />
            <p className="sub-heading">해당 선수의 이름은?</p>
            <p className="instructions">아래의 버튼을 눌러 시작하세요!</p>
            <button className="fetch-button" onClick={fetchPlayerData}>
                선수 이미지 맞추기 시작
            </button>

            {selectedPhoto && (
                <div className="player-photo">
                    <img src={`data:image/jpeg;base64,${selectedPhoto}`} alt="선수 사진" />
                </div>
            )}

            <div className="player-buttons">
                {playerData?.map((player: any) => (
                    <button
                        key={player.number}
                        className="player-button"
                        onClick={() => handleAnswer(player.name)}
                    >
                        {player.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MatchPlayer;

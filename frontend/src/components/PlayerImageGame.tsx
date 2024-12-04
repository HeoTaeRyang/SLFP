import React, { useState, useEffect } from 'react';
import PlayerImageCard from '../components/PlayerImageCard';
import AnswerInput from '../components/AnswerInput';
import axios from 'axios';

interface Player {
    id: number;
    name: string;
    image: string; // Base64 인코딩된 이미지 데이터
}

const PlayerImageGame: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        // 백엔드에서 선수 데이터를 가져오는 부분
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('/api/players');
                setPlayers(response.data);
            } catch (error) {
                console.error('Failed to fetch players:', error);
            }
        };
        fetchPlayers();
    }, []);

    const handleAnswerSubmit = (answer: string) => {
        if (players.length > 0 && answer.toLowerCase() === players[currentPlayerIndex].name.toLowerCase()) {
            setScore(score + 1);
            alert('정답입니다!');
        } else {
            alert('틀렸습니다. 다시 시도해보세요.');
        }
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    if (players.length === 0) return <div>로딩 중...</div>;

    return (
        <div className="player-image-game">
            <h1>선수 이미지 맞추기 게임</h1>
            <PlayerImageCard player={players[currentPlayerIndex]} />
            <AnswerInput onSubmit={handleAnswerSubmit} />
            <p>현재 점수: {score}</p>
        </div>
    );
};

export default PlayerImageGame;

import React from 'react';

interface Player {
    id: number;
    name: string;
    image: string; // Base64 인코딩된 이미지 데이터
}

interface PlayerImageCardProps {
    player: Player;
}

const PlayerImageCard: React.FC<PlayerImageCardProps> = ({ player }) => {
    return (
        <div className="player-image-card">
            <img 
                src={`data:image/jpeg;base64,${player.image}`} 
                alt="선수 이미지" 
                style={{ width: '300px', height: '400px' }} 
            />
        </div>
    );
};

export default PlayerImageCard;

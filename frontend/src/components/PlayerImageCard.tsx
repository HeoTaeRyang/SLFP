import React from 'react';

interface Player {
    id: number;
    name: string;
    imageUrl: string;
}

interface PlayerImageCardProps {
    player: Player;
}

const PlayerImageCard: React.FC<PlayerImageCardProps> = ({ player }) => {
    return (
        <div className="player-image-card">
            <img src={player.imageUrl} alt="선수 이미지" style={{ width: '300px', height: '400px' }} />
        </div>
    );
};

export default PlayerImageCard;
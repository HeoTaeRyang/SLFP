import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';  // useNavigate 임포트
import '../styles/Findlike.css';

const Findlike: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [player, setPlayer] = useState<{ name: string; image: string } | null>(null);
  const [loading, setLoading] = useState(false);  // 로딩 상태 추가
  const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setLoading(true);  // 로딩 시작
      try {
        const response = await axios.post("http://localhost:5000/findLike", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const photo = `data:image/jpeg;base64,${response.data.photo}`;
        const name = response.data.name;
        setPlayer({ name: name, image: photo });
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setLoading(false);  // 로딩 끝
      }
    }
  };

  // "다시하기" 버튼 클릭 시 상태 초기화
  const handleReset = () => {
    setImage(null);
    setPlayer(null);
  };

  // "홈으로" 버튼 클릭 시 홈 페이지로 이동
  const handleHome = () => {
    navigate('/');  // 홈 페이지로 이동
  };

  return (
    <div className="find-like-box">
      <div className="find-like-content">
        <img className="findlike-image" src="findlike.png" alt="dump" />
        <div className="find-like-title">닮은꼴 야구선수 찾기</div>
        <div className="find-like-text-1">나는 어떤 야구선수와 비슷하게 생겼을까요?</div>
        <div className="find-like-text-3">↓↓ 클릭해서 사진 찾기 ↓↓</div>

        {/* 사진 업로드 박스 */}
        <div className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="file-input"
            className="file-input"
          />

          {/* 미리보기 이미지 */}
          {image && (
            <div className="image-preview">
              <img src={image} alt="Uploaded preview" className="preview-img" />
            </div>
          )}
        </div>

        {/* 로딩 중일 때 표시 */}
        {loading && <div>선수를 찾는 중...</div>}

        <div className="find-like-text-4">*** 사진은 닮은꼴 테스트 진행 후 삭제됩니다 ***</div>

        {/* 더미 데이터로 선택된 선수 이름 및 이미지 표시 */}
        {player && (
          <div className="find-like-answer">
            <div className="player-info">
              <img src={player.image} alt={player.name} className="player-img" />
              <p>{player.name} 선수와 닮았어요!</p>
            </div>
          </div>
        )}

        {/* "다시하기" 버튼과 "홈으로" 버튼 추가 */}
        <div className="buttons">
          <button onClick={handleReset} className="reset-button">다시하기</button>
          <button onClick={handleHome} className="home-button">홈으로</button>
        </div>

        <footer className="footer">
          <div className="footer_msg">ⓒ 2024. YU_SLFP All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
};

export default Findlike;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FreePostBox.css';

type FreePostBoxProps = {
  postId: number;   // 게시글 ID
  title: string;    // 제목
  author: string;   // 작성자
  date: string;     // 작성일
  views: number;    // 조회수
};

const FreePostBox: React.FC<FreePostBoxProps> = ({ postId, title, author, date, views}) => {
  return (      
    <div className="free-post-box-0">
      <div className="free-post-No">{postId}</div>
      <div className="free-post-box-title">
        <Link to={`/free/${postId}`} className="free-post-link">
          {title}
        </Link>
      </div>
        <div className="free-post-user">{author}</div>
        <div className="free-post-time">{date}</div>
        <div className="free-post-watch">{views}</div>
    </div>
  );
};

export default FreePostBox;
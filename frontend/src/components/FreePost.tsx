import { useState, useEffect } from 'react';
import FreePostBox from './FreePostBox';
import axios from 'axios';
import '../styles/FreePost.css'; // CSS 스타일 파일 import

type FreePost = {
  id: number;
  title: string;
  user: string;
  time: string;
  views: number;
  comments: number;
  recommends: number;
};

const FreePost = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<FreePost[]>([]);
  const [sortMethod, setSortMethod] = useState<number>(0); // 0: 최신순, 1: 조회순
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchPosts = async (pageNumber: number, sortMethod: number) => {
    try {
      const requestData = {
        pageNumber: pageNumber,
        sortMethod: sortMethod,
      };

      const response = await axios.post(
        'http://localhost:5000/postPages', // 서버에서 데이터를 가져오는 API
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTotalPages(response.data.totalPages); // 총 페이지 수
      setPosts(response.data.Pages); // 가져온 게시글 목록을 상태에 저장
    } catch (error) {
      console.error('게시글 목록을 가져오는 중 오류 발생:', error);
    }
  };
  
  useEffect(() => {
    fetchPosts(currentPage, sortMethod); // 페이지나 정렬 방식이 변경될 때마다 호출
    const userId = localStorage.getItem("id");
    setIsLoggedIn(!!userId); // id가 있으면 true, 없으면 false
  }, [currentPage, sortMethod]);

  return (
    <div className="free-post-container">
     <div className="free-box">
      <div className="box-text">게시판</div>
      {/* 정렬 버튼 */}
      <div className="free-post-sort-array">
        <button
          onClick={() => setSortMethod(0)}
          className={`free-post-sort-button ${sortMethod === 0 ? 'active' : ''}`}
        >
          최신순
        </button>
        <button
          onClick={() => setSortMethod(1)}
          className={`free-post-sort-button ${sortMethod === 1 ? 'active' : ''}`}
        >
          조회순
        </button>
      </div>
      <div className="free-container-underbox"></div>
     </div>
      <div className="free-post-list">
        <div className="free-text-1">No</div>
        <div className="free-text-2">제목</div>
        <div className="free-text-3">닉네임</div>
        <div className="free-text-4">작성시간</div>
        <div className="free-text-5">조회수</div>
      </div>
      <div className="free-container-underbox-0"></div>
    

      {/* 게시글 목록 */}
      {posts.map((post) => (
        <FreePostBox
          key={post.id}
          postId={post.id}
          title={post.title}
          author={post.user}
          date={post.time}
          views={post.views}
        />
      ))}

      {/* 글 작성 버튼 */}
      <button
        className="free-send-button"
        onClick={(e) => {
          if (!isLoggedIn) {
            e.preventDefault();
            alert("로그인 후 이용할 수 있습니다.");
          } else {
            window.location.href = "/free/writing"; // 페이지 이동
          }
        }}
      >
        글 작성하기
      </button>


      {/* 페이징 버튼 */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      
    </div>
  );
};

export default FreePost;
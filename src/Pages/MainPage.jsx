import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { masonryLayout } from '../utils';
import '../index.css';

// 포트폴리오 예시 데이터 작성 코드
const portfolioItems = Array.from({ length: 201 }, (_, i) => ({
  id: i + 1,
  title: `포트폴리오 ${i + 1}`,
  img: `/assets/imgs/test/${(i % 9) + 1}.png`,
  likes: Math.floor(Math.random() * 5000) + 100,
  height: [250, 300, 350, 400, 450][i % 5]
}));

const MainPage = () => {
  const navigate = useNavigate();

  // 현재 페이지 관리 스테이터스
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지 최대 사이즈
  const pageSize = 50;
  // 전체 페이지 갯수
  const totalPages = Math.ceil(portfolioItems.length / pageSize);

  // 현재 페이지 해당하는 포트폴리오만 로딩
  const displayedItems = portfolioItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 포트폴리오 크기를 계산하여 적당한 위치에 정렬 하는 코드
  useEffect(() => {
    masonryLayout();
    window.addEventListener("resize", masonryLayout);
    return () => window.removeEventListener("resize", masonryLayout);
  }, [displayedItems]); // 페이지 이동시 로딩

  // 시작하기 버튼
  const handleStartClick = () => {
    navigate("/portfolio");
  };

  // 포트폴리오 클릭시 상세 페이지로 이동
  const handlePortfolioClick = () => {
    navigate("/portfolioDetail");
  };

  // 이전 페이지
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  // 다음 페이지
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // ClassName의 앞부분 mp는 mainPage를 뜻함.
  return (
    <>
      {/* 대표 이미지 컨테이너 */}
      <div className="mp-hero-container">
        <div className="mp-hero-text">
          <div className="mp-hero-headline">
            포트폴리오 공유,<br />
            더 나은 커리어의 시작!
          </div>
          <button className="mp-hero-button" onClick={handleStartClick}>
            <span className="mp-hero-button-text">시작하기 &gt;</span>
          </button>
        </div>
        {/* 대표 이미지 컨테이너의 이미지 컨테이너 */}
        <div className="mp-hero-image-container">
          <img className='mp-hero-image' src="/assets/imgs/LoginPage_img.png" alt="이미지" />
        </div>
      </div>

      {/*  */}
      <div className="mp-container">
        <h1 className="mp-title">추천 포트폴리오</h1>
        <p className="mp-subtitle">다른 포트폴리오 구경하기</p>

        {/* 페이지 이동 버튼 */}
        <div className="">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            이전
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            다음
          </button>
        </div>

        {/* 포트폴리오 컨테이너 */}
        <div className="mp-portfolio-container">
          {/* 예시데이터를 넣어서 화면에 표시 */}
          {displayedItems.map(item => (
            <div key={item.id} className="mp-portfolio-item" onClick={handlePortfolioClick}>
              <div className="mp-portfolio-like">
                <img 
                  src="/assets/imgs/Like_img.png" 
                  alt="포트폴리오 이미지" 
                  className="mp-like-img" 
                />
                <div className="mp-like-count">{item.likes}</div>
              </div>
              <div className="mp-portfolio-img">
                <img className="mp-portfolio-img" src={item.img} alt={item.title} style={{ height: `${item.height}px` }}/>
              </div>
              <div className="mp-portfolio-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;

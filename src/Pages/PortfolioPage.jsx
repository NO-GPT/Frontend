import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { masonryLayout } from '../utils/masonryLayout';
import '../index.css';

const portfolioItems = Array.from({ length: 201 }, (_, i) => ({
  id: i + 1,
  title: `포트폴리오 ${i + 1}`,
  img: `/assets/imgs/test/${(i % 9) + 1}.png`,
  likes: Math.floor(Math.random() * 3000) + 100,
  height: [250, 300, 350, 400, 450][i % 5]
}));

const PortfolioPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;
  const totalPages = Math.ceil(portfolioItems.length / pageSize);
  const displayedItems = portfolioItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const [searchText, setSearchText] = useState('');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // onResize 함수는 useCallback으로 메모이제이션 (이벤트 제거를 위해 동일한 참조 유지)
  const onResize = useCallback(() => {
    if (containerRef.current) {
      masonryLayout(containerRef.current, "fp-portfolio-item", "fp-portfolio-img");
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    masonryLayout(containerRef.current, "fp-portfolio-item", "fp-portfolio-img");

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);    
  }, [displayedItems, onResize]);

  const handlePortfolioClick = () => {
    navigate('/portfolioDetail');
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const toggleSidePanel = () => {
    setIsSidePanelOpen(prev => !prev);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  return (
    <div className="fp-page-wrapper">
      <div className="fp-header">
        <h1 className="fp-title">추천 포트폴리오</h1>
        <p className="fp-subtitle">다른 포트폴리오 구경하기</p>
        <div className="fp-search-row">
          <div className="fp-search-input-wrapper">
            <input 
              type="text" 
              className="fp-search-input" 
              placeholder="검색어를 입력해주세요." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span className="fp-search-icon">(아이콘)</span>
          </div>
          <div className="fp-more-icon" onClick={toggleSidePanel}>
            &#9776;
          </div>
        </div>
      </div>

      {/* 사이드 패널 오버레이 */}
      {isSidePanelOpen && <div className="fp-overlay" onClick={closeSidePanel}></div>}

      {/* 사이드 패널 */}
      <div className={`fp-side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <div className="fp-side-panel-header">
          <span className="fp-side-panel-title">카테고리</span>
          <span className="fp-side-panel-close" onClick={closeSidePanel}>X</span>
        </div>
        {/* 추가 카테고리 내용은 이곳에 삽입 */}
      </div>

      <div className="fp-container">
        <div className="fp-pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>이전</button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>다음</button>
        </div>

        <div className="fp-portfolio-container" ref={containerRef}>
          {displayedItems.map(item => (
            <div key={item.id} className="fp-portfolio-item" onClick={handlePortfolioClick}>
              <div className="fp-portfolio-like">
                <img 
                  src="/assets/imgs/Like_img.png" 
                  alt="포트폴리오 좋아요" 
                  className="fp-like-img" 
                />
                <div className="fp-like-count">{item.likes}</div>
              </div>
              <div className="fp-portfolio-img">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  style={{ height: `${item.height}px` }} 
                />
              </div>
              <div className="fp-portfolio-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;

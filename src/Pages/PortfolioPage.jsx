import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { masonryLayout } from '../utils/masonryLayout';
import '../index.css';

// 포트폴리오 (더미 데이터)
const portfolioItems = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  title: `포트폴리오 ${i + 1}`,
  img: `/assets/imgs/test/${(i % 9) + 1}.png`,
  likes: Math.floor(Math.random() * 3000) + 100,
  height: [250, 300, 350, 400, 450][i % 5]
}));

const PortfolioPage = () => {
  const navigate = useNavigate();
  const { page } = useParams();

  const initialPage = parseInt(page, 10) || 1;  

  const [currentPage, setCurrentPage] = useState(initialPage);
  const pageSize = 50;
  const totalPages = Math.ceil(portfolioItems.length / pageSize);

  // 화면에 표시할 항목들 슬라이싱 (페이징 처리)
  const displayedItems = portfolioItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 검색어 상태
  const [searchText, setSearchText] = useState('');
  // 사이드 패널 오픈 여부
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const containerRef = useRef(null);

  // masonry 레이아웃 재계산
  const onResize = useCallback(() => {
    if (containerRef.current) {
      masonryLayout(
        containerRef.current, 
        "fp-portfolio-item", 
        "fp-portfolio-img"
      );
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    masonryLayout(
      containerRef.current, 
      "fp-portfolio-item", 
      "fp-portfolio-img"
    );
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);    
  }, [displayedItems, onResize]);

  // URL업데이트
  useEffect(() => {
    navigate(`/portfolio/${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  // 포트폴리오 항목 클릭 시 세부 페이지로 이동
  const handlePortfolioClick = () => {
    navigate('/portfolioDetail');
  };

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // 첫 페이지로 이동
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  // 마지막 페이지로 이동
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  // 사이드 패널 오픈
  const openSidePanel = () => {
    setIsSidePanelOpen(true);
  };

  // 사이드 패널 닫기
  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  // 아이콘 클릭 시 검색 처리
  const handleSearch = () => {
    console.log("검색:", searchText);
    // 검색 로직
  };

  // 현재 페이지를 기준으로 5개 페이지 번호 계산
  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = startPage + 4;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - 4);
    }
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // 페이지 이동 버튼 (배열 정리)
  const paginationControls = [
    { label: "«", onClick: handleFirstPage, disabled: currentPage === 1 },
    { label: "‹", onClick: handlePrevPage, disabled: currentPage === 1 },
    ...getPageNumbers().map(page => ({
      label: String(page),
      onClick: () => setCurrentPage(page),
      active: currentPage === page
    })),
    { label: "›", onClick: handleNextPage, disabled: currentPage === totalPages },
    { label: "»", onClick: handleLastPage, disabled: currentPage === totalPages }
  ];

  return (
    <div className="fp-page-wrapper">
      {/* 헤더 영역 */}
      <div className="fp-header">
        <h1 className="fp-title">추천 포트폴리오</h1>
        <p className="fp-subtitle">다른 포트폴리오 구경하기</p>
        <div className="fp-search-row">
          {/* 검색 입력창 */}
          <div className="fp-search-input-wrapper">
            <input  
              type="text" 
              className="fp-search-input" 
              placeholder="검색어를 입력해주세요." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {/* 검색창 아이콘 */}
            <img 
              src="assets/imgs/search.png"
              alt='검색 아이콘'
              className="fp-search-icon" 
              onClick={handleSearch}
            />
          </div>
          {/* 사이드 패널 토글 아이콘 */}
          <div className="fp-SidePanel-icon" onClick={openSidePanel}>
            &#9776;
          </div>
        </div>
      </div>

      {/* 사이드 패널 오버레이 (열린 경우) */}
      {isSidePanelOpen && (
        <div className="fp-overlay" onClick={closeSidePanel}></div>
      )}

      {/* 사이드 패널 */}
      <div className={`fp-side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <div className="fp-side-panel-header">
          <span className="fp-side-panel-title">카테고리</span>
          <span className="fp-side-panel-close" onClick={closeSidePanel}>&times;</span>
        </div>
      </div>

      <div className="fp-container">
        {/* 페이지 이동 버튼 */}
        <div className="fp-pagination">
          {paginationControls.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              disabled={btn.disabled}
              className={`fp-pagination-btn ${btn.active ? 'active' : ''}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* 포트폴리오 */}
        <div className="fp-portfolio-container" ref={containerRef}>
          {displayedItems.map(item => (
            <div 
              key={item.id} 
              className="fp-portfolio-item" 
              onClick={handlePortfolioClick}
            >
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

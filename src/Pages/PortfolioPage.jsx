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

  // 검색어 상태
  const [searchText, setSearchText] = useState('');
  // 사이드 패널 오픈 여부
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // 카테고리 상태
  const [affiliations, setAffiliations] = useState([
    { label: '취준생', selected: false },
    { label: '학생', selected: false },
    { label: '직장인', selected: false }
  ]);
  const [roles, setRoles] = useState([
    { label: 'FrontEnd', selected: false },
    { label: 'BackEnd', selected: false },
    { label: 'Designer', selected: false },
    { label: 'Engineer', selected: false }
  ]);
  const [languages, setLanguages] = useState([
    'JavaScript','TypeScript','Python','Java','C#','C++','Ruby','Go','PHP','Swift','Kotlin','Rust','Dart'
  ].map(lang => ({ label: lang, selected: false })));
  const [langSearch, setLangSearch] = useState('');

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

  // 페이지 리스트
  const displayedItems = portfolioItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


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

  // URL 업데이트
  useEffect(() => {
    navigate(`/portfolio/${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  // 포트폴리오 항목 클릭 시 세부 페이지로 이동
  const handlePortfolioClick = () => {
    navigate('/portfolioDetail');
  };

  // 카테고리 선택 토글
  const toggleCategory = (list, setList, idx) => {
    const copy = [...list];
    copy[idx].selected = !copy[idx].selected;
    setList(copy);
  };

  // 검색 실행
  const handleSearch = () => {
    console.log('검색 실행', { affiliations, roles, languages, searchText });
    // 검색
  };

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = startPage + 4;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - 4);
    }
    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  const paginationControls = [
    { label: "«", onClick: () => setCurrentPage(1), disabled: currentPage === 1 },
    { label: "‹", onClick: () => setCurrentPage(c => Math.max(c - 1, 1)), disabled: currentPage === 1 },
    ...getPageNumbers().map(p => ({ label: String(p), onClick: () => setCurrentPage(p), active: p === currentPage })),
    { label: "›", onClick: () => setCurrentPage(c => Math.min(c + 1, totalPages)), disabled: currentPage === totalPages },
    { label: "»", onClick: () => setCurrentPage(totalPages), disabled: currentPage === totalPages }
  ];

  return (
    <div className="fp-page-wrapper">
      {/* 헤더 영역 */}
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
              onChange={e => setSearchText(e.target.value)}
            />
            <img
              src="/assets/imgs/search_gray.png"
              alt='검색 아이콘'
              className="fp-search-icon"
              onClick={handleSearch}
            />
          </div>
          <div className="fp-side-panel-icon" onClick={() => setIsSidePanelOpen(true)}>&#9776;</div>
        </div>
      </div>

      {isSidePanelOpen && <div className="fp-overlay" onClick={() => setIsSidePanelOpen(false)}></div>}
      <div className={`fp-side-panel ${isSidePanelOpen ? 'open' : ''}`}>        
        <div className="fp-side-panel-header">
          <span className="fp-side-panel-title">카테고리</span>
          <span className="fp-side-panel-close" onClick={() => setIsSidePanelOpen(false)}>&times;</span>
        </div>
        <div className="fp-side-panel-content">
          {/* 소속 */}
          <div className="fp-side-section">
            <div className="fp-side-section-title small">소속</div>
            <div className="fp-side-categories">
              {affiliations.map((cat, idx) => (
                <div
                  key={idx}
                  className={`fp-cat-item ${cat.selected ? 'selected' : ''}`}
                  onClick={() => toggleCategory(affiliations, setAffiliations, idx)}
                >
                  {cat.label}
                </div>
              ))}
            </div>
          </div>
          {/* 담당 역할 */}
          <div className="fp-side-section">
            <div className="fp-side-section-title small">담당 역할</div>
            <div className="fp-side-categories">
              {roles.map((cat, idx) => (
                <div
                  key={idx}
                  className={`fp-cat-item ${cat.selected ? 'selected' : ''}`}
                  onClick={() => toggleCategory(roles, setRoles, idx)}
                >
                  {cat.label}
                </div>
              ))}
            </div>
          </div>
          {/* 언어 검색 */}
          <div className="fp-side-section">
            <div className="fp-side-section-title small">언어</div>
            <div className="fp-search-input-wrapper small">
              <input
                type="text"
                className="fp-lang-search"
                placeholder="언어 검색"
                value={langSearch}
                onChange={e => setLangSearch(e.target.value)}
              />
            </div>
            <div className="fp-side-categories fp-lang-list">
              {languages
                .filter(l => l.label.toLowerCase().includes(langSearch.toLowerCase()))
                .map((lang, idx) => (
                  <div
                    key={idx}
                    className={`fp-cat-item ${lang.selected ? 'selected' : ''}`}
                    onClick={() => toggleCategory(languages, setLanguages, idx)}
                  >
                    {lang.label}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* 검색 버튼 */}
        <button className="fp-side-search-btn" onClick={handleSearch}>
          <img src="/assets/imgs/search_white.png" alt="검색"/>
          검색하기
        </button>
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

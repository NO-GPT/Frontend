import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { masonryLayout } from '../utils/masonryLayout';
import { portfolioDetails } from '../data'; // 더미 데이터

// 카테고리 옵션
const affiliationOptions = ['취준생', '학생', '직장인'];
const roleOptions = ['FrontEnd', 'BackEnd', 'Designer', 'Engineer'];
const languageOptions = ['JavaScript','TypeScript','Python','Java','C#','C++','Ruby','Go','PHP','Swift','Kotlin','Rust','Dart'];

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = 50;

  // 쿼리 기반 검색어
  const [searchText, setSearchText] = useState(searchParams.get('q') || '');
  // 입력 중인 텍스트
  const [typedText, setTypedText] = useState(searchText);

  // 사이드 패널 열림 상태
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // 카테고리 상태
  const [affiliations, setAffiliations] = useState(
    affiliationOptions.map(label => ({ label, selected: false }))
  );
  const [roles, setRoles] = useState(
    roleOptions.map(label => ({ label, selected: false }))
  );
  const [languages, setLanguages] = useState(
    languageOptions.map(label => ({ label, selected: false }))
  );
  const [langSearch, setLangSearch] = useState('');  // 언어 검색어

  // 선택된 카테고리 라벨 목록
  const selectedAffs = affiliations.filter(a => a.selected).map(a => a.label);
  const selectedRoles = roles.filter(r => r.selected).map(r => r.label);
  const selectedLangs = languages.filter(l => l.selected).map(l => l.label);

  // 포트폴리오 아이템 필터링
  const filteredItems = portfolioDetails.filter(item => {
    if (searchText && !item.title.includes(searchText)) return false;
    if (selectedAffs.length && !selectedAffs.includes(item.affiliation)) return false;
    if (selectedRoles.length && !selectedRoles.includes(item.role)) return false;
    if (selectedLangs.length && 
      !item.language.some(lang => selectedLangs.includes(lang))
  ) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const displayedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Masonry 레이아웃 적용
  const containerRef = useRef(null);
  const onResize = useCallback(() => {
    if (containerRef.current) masonryLayout(containerRef.current, 'fp-portfolio-item', 'fp-portfolio-img');
  }, []);

  useEffect(() => {
    if (containerRef.current) masonryLayout(containerRef.current, 'fp-portfolio-item', 'fp-portfolio-img');
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [displayedItems, onResize]);

  // 페이지 변경
  const setPage = page => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  };

  // 카테고리 토글
  const toggleCategory = (list, setList, label) => {
    setList(list.map(item =>
      item.label === label ? { ...item, selected: !item.selected } : item
    ));
    setPage(1);
  };

  // 현재 페이지 기준 주변 페이지 번호 계산
  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // 검색
  const handleSearch = () => {
    setSearchText(typedText);
    searchParams.set('page', 1);
    searchParams.set('q', typedText);
    setSearchParams(searchParams);
  };

  // 포트폴리오 상세 페이지 이동
  const handlePortfolioClick = id => {
    navigate(`/portfolioDetail/${id}`);
  };

  return (
    <div className="fp-wrapper">
      <div className="fp-header">
        <h1 className="fp-title">추천 포트폴리오</h1>
        <p className="fp-subtitle">다른 포트폴리오 구경하기</p>
        <div className="fp-search-row">
          <div className="fp-search-input-wrapper">
            <input
              type="text"
              className="fp-search-input"
              placeholder="검색어를 입력해주세요."
              value={typedText}
              onChange={e => setTypedText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
            />
            <img
              src="/assets/imgs/search_gray.png"
              alt="검색 아이콘"
              className="fp-search-icon"
              onClick={handleSearch}
            />
          </div>
          <div className="fp-side-panel-icon" onClick={() => setIsSidePanelOpen(true)}>&#9776;</div>
        </div>
      </div>

      {/* 사이드 패널 */}
      {isSidePanelOpen && <div className="fp-overlay" onClick={() => setIsSidePanelOpen(false)} />}
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
              {affiliations.map(cat => (
                <div
                  key={cat.label}
                  className={`fp-cat-item ${cat.selected ? 'selected' : ''}`}
                  onClick={() => toggleCategory(affiliations, setAffiliations, cat.label)}
                >{cat.label}</div>
              ))}
            </div>
          </div>
          {/* 역할 */}
          <div className="fp-side-section">
            <div className="fp-side-section-title small">담당 역할</div>
            <div className="fp-side-categories">
              {roles.map(cat => (
                <div
                  key={cat.label}
                  className={`fp-cat-item ${cat.selected ? 'selected' : ''}`}
                  onClick={() => toggleCategory(roles, setRoles, cat.label)}
                >{cat.label}</div>
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
                .map(lang => (
                  <div
                    key={lang.label}
                    className={`fp-cat-item ${lang.selected ? 'selected' : ''}`}
                    onClick={() => toggleCategory(languages, setLanguages, lang.label)}
                  >{lang.label}</div>
                ))}
            </div>
          </div>
        </div>
        <button className="fp-side-search-btn" onClick={handleSearch}>
          <img src="/assets/imgs/search_white.png" alt="검색" /> 검색하기
        </button>
      </div>

      {/* 페이지 이동버튼 */}
      <div className="fp-container">
        <div className="fp-pagination">
          {[
            { label: '«', onClick: () => setPage(1), disabled: currentPage === 1 },
            { label: '‹', onClick: () => setPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1 },
            ...getPageNumbers().map(p => ({ label: String(p), onClick: () => setPage(p), active: p === currentPage })),
            { label: '›', onClick: () => setPage(Math.min(totalPages, currentPage + 1)), disabled: currentPage === totalPages },
            { label: '»', onClick: () => setPage(totalPages), disabled: currentPage === totalPages }
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              disabled={btn.disabled}
              className={`fp-pagination-btn ${btn.active ? 'active' : ''}`}
            >{btn.label}</button>
          ))}
        </div>
        {/* 포트폴리오 */}
        <div className="fp-portfolio-container" ref={containerRef}>
          {displayedItems.map(item => (
            <div key={item.id} className="fp-portfolio-item" onClick={() => handlePortfolioClick(item.id)}>
              <div className="fp-portfolio-like">
                <img src="/assets/imgs/Like_img.png" alt="좋아요" className="fp-like-img" />
                <div className="fp-like-count">{item.likes}</div>
              </div>
              <div className="fp-portfolio-img">
                <img src={item.img} alt={item.title} style={{ height: `${item.height}px` }} />
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
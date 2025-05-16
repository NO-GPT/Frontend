import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { portfolioDetails } from '../data/portfolioDetailData';

const PortfolioDetailPage = () => {
  const { id } = useParams();
  const detail = portfolioDetails.find(item => item.id === Number(id));
  const [pdfLoading, setPdfLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    // 실제 PDF 로딩 로직을 이곳에 구현
    const timer = setTimeout(() => setPdfLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!detail) {
    return <div className='pdp-error-page'>잘못된 포트폴리오 id입니다.</div>;
  }

  const { title, subtitle, stacks, role, details } = detail;

  return (
    <div className="pdp-container">
      <div className="pdp-hero" />

      <div className="pdp-main">
        <div className="pdp-header">
          <div className="pdp-title-wrapper">
            <div className="pdp-title">{title}</div>
            <button
              className="pdp-settings-button"
              onClick={() => setMenuOpen(open => !open)}
            >
              …
            </button>
            {menuOpen && (
              <div className="pdp-settings-menu" ref={menuRef}>
                <div className="pdp-menu-item">PDF 다운로드</div>
                <Link className="pdp-menu-item"to={`/edit/${id}`}>수정</Link>
                <div className="pdp-menu-item">삭제</div>
              </div>
            )}
          </div>
          <div className="pdp-subtitle">{subtitle}</div>
        </div>

        <div className="pdp-info">
          <div className="pdp-info-group">
            <div className="pdp-info-label">사용 스택</div>
            <div className="pdp-info-badges">
              {stacks.map((s, i) => <div key={i} className="pdp-badge">{s}</div>)}
            </div>
          </div>
          <div className="pdp-info-group">
            <div className="pdp-info-label">담당역할</div>
            <div className="pdp-badge">{role}</div>
          </div>
        </div>

        <div className="pdp-detail-section">
          <div className="pdp-section-title">상세내용</div>
          <div className="pdp-detail-text">{details}</div>
        </div>

        <div className="pdp-pagination">
          <button className="pdp-pagination-btn">이전</button>
          <div className="pdp-page-status">1/1</div>
          <button className="pdp-pagination-btn">다음</button>
        </div>

        <div className="pdp-pdf-loader">
          {pdfLoading ? (
            <div className="pdp-pdf-loading">PDF 로딩중...</div>
          ) : (
            <div className="pdp-pdf-container">
              {/* PDF 랜더링 컴포넌트 삽입 */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailPage;
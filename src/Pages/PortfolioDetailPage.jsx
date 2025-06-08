import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { portfolioDetails } from '../data';

// pdf.js 워커 설정
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const PortfolioDetailPage = () => {
  const { id } = useParams();
  const detail = portfolioDetails.find(item => item.id === Number(id));

  // pdf 페이지 수
  const [numPages, setNumPages] = useState(0);
  // pdf 현재 페이지
  const [pageNumber, setPageNumber] = useState(1);

  // ... 메뉴 오픈 상태
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // 댓글 모달 오픈 상태
  const [showComments, setShowComments] = useState(false);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = e => {
      const path = e.composedPath();
      if (!path.includes(menuRef.current)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 포트폴리오 정보가 없을 시 에러 표시
  if (!detail) {
    return <div className="pdp-error-page">잘못된 포트폴리오 id입니다.</div>;
  }
  const { title, subtitle, language, role, details, pdfUrl } = detail;

  // pdf 페이지 이탈 방지
  const handleChangePage = (offset) => {
    setPageNumber(prev => Math.min(Math.max(prev + offset, 1), numPages));
  };

  // 댓글 목데이터 생성 (15개)
  const mockComments = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    user: `USERid${i + 1}`,
    text: `이것은 ${i + 1}번째 댓글 예시입니다. 길이가 길면 적절히 줄바꿈됩니다.`
  }));

  return (
    <div className="pdp-container">
      <div className="pdp-hero"/>

      <div className="pdp-main">
        <div className="pdp-header">
          <div className="pdp-title-wrapper">
            <div className="pdp-title">{title}</div>
            {menuOpen && <div className="pdp-overlay" onClick={() => setMenuOpen(false)} />}
            <button
              className="pdp-settings-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              …
            </button>
            {menuOpen && (
              <div className="pdp-settings-menu" ref={menuRef}>
                <div className="pdp-menu-item">PDF 다운로드</div>
                <Link className="pdp-menu-item" to={`/edit/${id}`}>수정</Link>
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
              {language.map((s, i) => (
                <div key={i} className="pdp-badge">{s}</div>
              ))}
            </div>
          </div>

          <div className="pdp-info-group">
            <div className="pdp-info-label">담당 역할</div>
            <div className="pdp-badge">{role}</div>
          </div>

          <div className="pdp-detail-section">
            <div className="pdp-section-title">상세내용</div>
            <div className="pdp-detail-text">{details}</div>
          </div>
        </div>

        <div className="pdp-pagination">
          <button
            className="pdp-pagination-btn"
            onClick={() => handleChangePage(-1)}
            disabled={pageNumber <= 1}
          >
            이전
          </button>
          <div className="pdp-page-status">
            {pageNumber} / {numPages}
          </div>
          <button
            className="pdp-pagination-btn"
            onClick={() => handleChangePage(1)}
            disabled={pageNumber >= numPages}
          >
            다음
          </button>
        </div>

        {/* PDF 로딩 및 렌더링 */}
        <div className="pdp-pdf-viewer">
          <Document
            file={encodeURI(pdfUrl)}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<div className="pdp-loading">PDF파일 로딩중 …</div>}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={<div className="pdp-loading">페이지 로딩중 …</div>}
              scale={2.0}
            />
          </Document>
        </div>
      </div>

      {/* 댓글 버튼 */}
      <button
        className="pdp-comment-button"
        onClick={() => setShowComments(true)}
      >
        <img
          className="pdp-comment-icon"
          src="/assets/imgs/댓글_img.png"
          alt="댓글"
        />
      </button>

      {/* 댓글 */}
      {showComments && (
        <>
          {/* 오버레이 */}
          <div
            className="pdp-comment-overlay"
            onClick={() => setShowComments(false)}
          />

          {/* 댓글 모달 박스 */}
          <div className="pdp-comment-modal">
            <div className="pdp-comment-header">
              <span>댓글</span>
              <button
                className="pdp-comment-close"
                onClick={() => setShowComments(false)}
              >
                ×
              </button>
            </div>
            {/* 댓글 입력창 */}
            <div className="pdp-comment-input">
              <div className="pdp-comment-avatar" />
              <input
                type="text"
                className="pdp-comment-input-field"
                placeholder="댓글 추가..."
              />
            </div>

            {/* 댓글 리스트 로딩 */}
            <div className="pdp-comment-list">
              {mockComments.map(comment => (
                <div key={comment.id} className="pdp-comment-item">
                  <div className="pdp-comment-item-avatar" />
                  <div className="pdp-comment-item-content">
                    <div className="pdp-comment-item-user">
                      {comment.user}
                    </div>
                    <div className="pdp-comment-item-text">
                      {comment.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PortfolioDetailPage;

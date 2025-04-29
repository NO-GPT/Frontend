import React from 'react';

const PortfolioDetailPage = () => {

  return (
    <div className="pdp-container">

      <div className="pdp-hero">
      </div>      

      <div className='pdp-main'>

        <div className="pdp-header">
          <div className="pdp-title">Title</div>
          <div className="pdp-subtitle">subTitle</div>
        </div>

        {/* 사용 스택 / 담당 역할 */}
        <div className="pdp-info">
          <div className="pdp-info-group">
            <div className="pdp-info-label">사용 스택</div>
            <div className="pdp-info-badges">
              <div className="pdp-badge">Figma</div>
            </div>
          </div>
          <div className="pdp-info-group">
            <div className="pdp-info-label">담당역할</div>
            <div className="pdp-badge">디자이너</div>
          </div>
        </div>

        <div className="pdp-detail-section">
          <h3 className="pdp-section-title">상세내용</h3>
          <p className="pdp-detail-text">사용자 피로도를 줄이기 위해 여백을 충분히 활용하고, 불필요한 정보를 최소화하여 직관적인 UI를 구성했습니다. 메인 컬러로는 보라색 계열을 사용해 감성적이고 세련된 분위기를 조성했으며, 음악 앱이 제공할 수 있는 취향 기반의 추천과 감정적 공감 요소를 강조했습니다. <br />
          Linkly를 디자인하며 감성적인 사용자 경험을 어떻게 시각적으로 풀어낼지에 대해 많이 고민했습니다. 여백과 컬러, 콘텐츠 흐름을 조화롭게 구성하는 과정에서 ‘사용되기 위한 디자인’의 중요성을 배울 수 있었습니다. 특히 음악이라는 콘텐츠의 특성상, 사용자와의 정서적 연결을 고려한 UI 설계가 중요하다는 점을 깨달았습니다.</p>
        </div>

        <div className="pdp-pagination">
          <button className="pdp-pagination-btn">이전</button>
          <div className="pdp-page-status">1/1</div>
          <button className="pdp-pagination-btn">다음</button>
        </div>

        <div className="pdp-pdf-loader">
          <div className="pdp-pdf-container" />
        </div>

        <div className="pdp-download">
          <div className="pdp-download-card">
            <img src="/assets/imgs/pdf_img.png" alt="PDF" className="pdp-pdf-img" />
          </div>
          <button className="pdp-download-btn">파일 다운로드</button>
        </div>

      </div>
    </div>
  );
};

export default PortfolioDetailPage;

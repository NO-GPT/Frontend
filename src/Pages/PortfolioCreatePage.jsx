import { useState } from 'react';

const PortfolioCreatePage = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [stackInput, setStackInput] = useState('');
  const [stacks, setStacks] = useState([]);
  const [role, setRole] = useState('');
  const [details, setDetails] = useState('');
  const [pdfName, setPdfName] = useState('');

  const addStack = () => {
    if (stackInput && !stacks.includes(stackInput)) {
      setStacks([...stacks, stackInput]);
      setStackInput('');
    }
  };

  const handleImageUpload = e => {
    // 이미지 업로드 로직
  };

  const handlePdfUpload = () => {
    // PDF 업로드 로직
  };

  const handleSubmit = e => {
    e.preventDefault();
    // 폼 전송 로직
  };

  return (
    <div className="pcd-container">
      <div className="pcd-hero">
        <img
          className="pcd-image-uploader"
          onClick={handleImageUpload}
          src="/assets/imgs/사진업로드.png"
          alt="업로드"
        />
      </div>

      <form className="pcd-form" onSubmit={handleSubmit}>
        <div className="pcd-group-row">
          <div className="pcd-group">
            <label className="pcd-label">제목</label>
            <input
              type="text"
              className="pcd-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="pcd-group">
            <label className="pcd-label">소제목</label>
            <input
              type="text"
              className="pcd-input"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
            />
          </div>
        </div>

        <div className="pcd-group-row">
          <div className="pcd-group pcd-stack-group">
            <label className="pcd-label">사용 스택</label>
            <div className="pcd-stack-input-area">
              <input
                type="text"
                className="pcd-input pcd-stack-input"
                value={stackInput}
                onChange={e => setStackInput(e.target.value)}
              />
              <button
                type="button"
                className="pcd-btn"
                onClick={addStack}
              >추가</button>
            </div>
            <div className="pcd-stack-list">
              {stacks.map((s, idx) => (
                <span key={idx} className="pcd-stack-badge">{s}</span>
              ))}
            </div>
          </div>

          <div className="pcd-group">
            <label className="pcd-label">담당 역할</label>
            <select
              className="pcd-input pcd-select"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="">선택</option>
              <option value="Engineer">PM</option>
              <option value="Designer">Designer</option>
              <option value="FrontEnd">FrontEnd</option>
              <option value="BackEnd">BackEnd</option>
              <option value="Engineer">Engineer</option>
            </select>
          </div>
        </div>

        <div className="pcd-group">
          <label className="pcd-label">상세내용</label>
          <textarea
            className="pcd-detail-input"
            value={details}
            onChange={e => setDetails(e.target.value)}
          />
        </div>

        <div className="pcd-group">
          <label className="pcd-label">PDF 파일명</label>
          <div className="pcd-pdf-input-area">
            <input
              type="text"
              className="pcd-input pcd-pdf-input"
              value={pdfName}
              onChange={e => setPdfName(e.target.value)}
              maxLength={50}
            />
            <button
              type="button"
              className="pcd-btn"
              onClick={handlePdfUpload}
            >업로드</button>
          </div>
        </div>

        <div className="pcd-submit-wrapper">
          <button type="submit" className="pcd-submit-btn">등록</button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioCreatePage;

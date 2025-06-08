import { useState, useRef, useEffect, useCallback } from 'react';


function useDragMove(onMove) {
  const dragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  
  // 드래그 시작 시점
  const handleMouseDown = e => {
    dragging.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  // 드래그 중
  const handleMouseMove = e => {
    if (!dragging.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    startPos.current = { x: e.clientX, y: e.clientY };
    onMove(dx, dy);
  };

  // 드래그 종료
  const handleMouseUp = () => { dragging.current = false; };

  // 이벤트 등록
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return { handleMouseDown };
}

const PortfolioCreatePage = () => {
  // 텍스트/파일 상태
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [stackInput, setStackInput] = useState('');
  const [stacks, setStacks] = useState([]);
  const [role, setRole] = useState('');
  const [details, setDetails] = useState('');
  const [pdfName, setPdfName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  // 이미지 업로드 및 배경 위치 상태
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 }); // % 단위

  // ref
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const heroRef = useRef(null);
  const imgUrlRef = useRef(null);

  // 스택 추가
  const addStack = () => {
    if (stackInput && !stacks.includes(stackInput)) {
      setStacks([...stacks, stackInput]);
      setStackInput('');
    }
  };

  // 스택 제거
  const removeStack = (stack) => {
    setStacks(prev => prev.filter(s => s !== stack));
  };

  // PDF 업로드 클릭
  const handlePdfUploadClick = () => {
    fileInputRef.current?.click();
  };

  // PDF 파일 선택
  const handlePdfChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      setPdfName(file.name);
    }
  };

  // 이미지 파일 선택 및 URL 생성
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    imgUrlRef.current && URL.revokeObjectURL(imgUrlRef.current);
    const url = URL.createObjectURL(file);
    imgUrlRef.current = url;
    setImageFile(file);
    setImageFileUrl(url);
    setBgPos({ x: 50, y: 50 });
  };
  
  // 이미지 파일 삭제
  const removeImage = () => {
    imgUrlRef.current && URL.revokeObjectURL(imgUrlRef.current);
    imgUrlRef.current = null;
    setImageFile(null);
    setImageFileUrl(null);
    setBgPos({ x: 50, y: 50 });
  };

  // 커스텀 훅을 통해 드래그 이동 처리
  const onMove = useCallback((dx, dy) => {
    if (!heroRef.current) return;
    const { width, height } = heroRef.current.getBoundingClientRect();
    setBgPos(prev => {
      let nx = prev.x + (dx / width) * 100;
      let ny = prev.y + (dy / height) * 100;
      nx = Math.min(100, Math.max(0, nx));
      ny = Math.min(100, Math.max(0, ny));
      return { x: nx, y: ny };
    });
  }, []);


  const { handleMouseDown } = useDragMove(onMove);

  // 컴포넌트 언마운트 시 URL 해제
  useEffect(() => {
    return () => {
      imgUrlRef.current && URL.revokeObjectURL(imgUrlRef.current);
    };
  }, []);

  // 폼 전송
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('role', role);
    formData.append('details', details);
    formData.append('stacks', JSON.stringify(stacks));
    if (pdfFile) formData.append('pdf', pdfFile);
    if (imageFile) formData.append('image', imageFile);
    // TODO: fetch 또는 axios로 백엔드 전송
  };

  return (
    <div className="pcp-container">
      <div
        ref={heroRef}
        className="pcp-hero"
        onClick={() => !imageFileUrl && imageInputRef.current.click()}
        onMouseDown={handleMouseDown}
        style={{
          backgroundImage: imageFileUrl ? `url(${imageFileUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
          cursor: imageFileUrl ? 'move' : 'pointer',
        }}
      >
        {!imageFileUrl && (
          <img
            className="pcp-image-uploader"
            src="/assets/imgs/사진업로드.png"
            alt="업로드"
          />
        )}
        {imageFileUrl && (
          <div className='pcp-remove-image-area'>
            <div className="pcp-remove-image-btn" onClick={removeImage}>
              ×
            </div>
          </div>
        )}
        <input
          type="file"
          ref={imageInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <form className="pcp-form" onSubmit={handleSubmit}>
        <div className="pcp-group-row">
          <div className="pcp-group">
            <label className="pcp-label">제목</label>
            <input
              type="text"
              className="pcp-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="pcp-group">
            <label className="pcp-label">소제목</label>
            <input
              type="text"
              className="pcp-input"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
            />
          </div>
        </div>

        <div className="pcp-group-row">
          <div className="pcp-group pcp-stack-group">
            <label className="pcp-label">사용 스택</label>
            <div className="pcp-stack-input-area">
              <input
                type="text"
                className="pcp-input pcp-stack-input"
                value={stackInput}
                onChange={e => setStackInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addStack();
                  }
                }}
              />
              <button
                type="button"
                className="pcp-btn"
                onClick={addStack}
              >
                추가
              </button>
            </div>
            <div className="pcp-stack-list">
              {stacks.map((s, idx) => (
                <div key={idx} className="pcp-stack-badge" onClick={() => removeStack(s)}>
                  {s}
                  <div
                    className="pcp-remove-stack-btn"
                  >
                    ×
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pcp-group">
            <label className="pcp-label">담당 역할</label>
            <select
              className="pcp-input pcp-select"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="">선택</option>
              <option value="PM">PM</option>
              <option value="Designer">Designer</option>
              <option value="FrontEnd">FrontEnd</option>
              <option value="BackEnd">BackEnd</option>
              <option value="Engineer">Engineer</option>
            </select>
          </div>
        </div>

        <div className="pcp-group">
          <label className="pcp-label">상세내용</label>
          <textarea
            className="pcp-detail-input"
            value={details}
            onChange={e => setDetails(e.target.value)}
          />
        </div>

        <div className="pcp-group">
          <label className="pcp-label">PDF</label>
          <div className="pcp-pdf-input-area">
            <input
              type="text"
              className="pcp-input pcp-pdf-input"
              value={pdfName}
              readOnly
            />
            <button
              type="button"
              className="pcp-btn"
              onClick={handlePdfUploadClick}
            >업로드</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="application/pdf"
              onChange={handlePdfChange}
            />
          </div>
        </div>

        <div className="pcp-submit-wrapper">
          <button type="submit" className="pcp-submit-btn">등록</button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioCreatePage;

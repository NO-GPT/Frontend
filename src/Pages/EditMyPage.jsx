import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../Components/InputGroup";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "userName",
    email: "userName@gmail.com",
    name: "유저",
    affiliation: "학생",
    field: "개발자",
    birthdate: "2007-12-13",
    age: "17",
    phone: "010-1111-1111",
    github: "userNameGithub",
    stacks: ["HTML", "Figma", "JavaScript"],
  });
  const [isDirty, setIsDirty] = useState(false);

  // 스택 입력
  const [stackInput, setStackInput] = useState("");
  const [stacks, setStacks] = useState([...user.stacks]);

  useEffect(() => {
    // 백엔드에서 사용자 정보 가져오기
  }, []);

  // user의 일반 텍스트 필드 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((u) => ({ ...u, [name]: value }));
    setIsDirty(true);
  };

  // 스택 추가
  const handleStackAdd = () => {
    const trimmed = stackInput.trim();
    if (trimmed === "") return;
    if (stacks.includes(trimmed)) {
      setStackInput(""); // 중복 방지 후 입력창 초기화
      return;
    }
    setStacks((prev) => [...prev, trimmed]);
    setStackInput("");
    setIsDirty(true);
  };

  // 스택 삭제
  const handleStackRemove = (target) => {
    setStacks((prev) => prev.filter((s) => s !== target));
    setIsDirty(true);
  };

  // 저장 버튼
  const handleSave = () => {
    const updatedUser = { ...user, stacks };
    setUser(updatedUser);
    setIsDirty(false);
    navigate("/mypage");
  };

  return (
    <div className="edp-container">
      <div className="edp-hero" />

      <main className="edp-main">
        <div className="edp-profile-summary">
          <div className="edp-profile-img" />
          <div className="edp-userinfo">
            <div className="edp-username">{user.username}</div>
            <div className="edp-useremail">{user.email}</div>
          </div>
          <button
            className="edp-cancel-btn"
            onClick={() => navigate("/mypage")}
          >
            취소
          </button>
        </div>

        <div className="edp-details">
          <div className="edp-details-col">
            <InputGroup label="이름">
              <input
                id="name"
                name="name"
                className="edp-input"
                value={user.name}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup label="소속">
              <input
                id="affiliation"
                name="affiliation"
                className="edp-input"
                value={user.affiliation}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup label="분야">
              <input
                id="field"
                name="field"
                className="edp-input"
                value={user.field}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup label="생년월일">
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                className="edp-input"
                value={user.birthdate}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup label="보유 스택">
              <div className="edp-stacks-input-area">
                <input
                  type="text"
                  id="stacks"
                  name="stacks"
                  className="edp-input pcp-stack-input"
                  placeholder="보유 스택을 추가해주세요"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleStackAdd();
                    }
                  }}
                />
              </div>
              {/* 추가한 스택 */}
              {stacks.length > 0 && (
                <div className="edp-stack-list">
                  {stacks.map((s, idx) => (
                    <span key={idx} className="edp-stack-badge" onClick={() => handleStackRemove(s)}>
                      {s}
                      <div
                        className="edp-remove-stack-btn"
                      >
                        ×
                      </div>
                    </span>
                  ))}
                </div>
              )}
            </InputGroup>
          </div>

          <div className="edp-details-col">
            <InputGroup label="나이">
              <div className="edp-age-input-wrapper">
                <input
                  id="age"
                  name="age"
                  className="edp-input edp-age-input"
                  value={user.age}
                  onChange={handleChange}
                />
                <span className="edp-age-unit-inside">세</span>
              </div>
            </InputGroup>

            <InputGroup label="전화번호">
              <input
                id="phone"
                name="phone"
                className="edp-input"
                value={user.phone}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup label="Github">
              <input
                id="github"
                name="github"
                className="edp-input"
                value={user.github}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup label="이메일">
              <input
                id="email"
                name="email"
                className="edp-input"
                value={user.email}
                onChange={handleChange}
              />
            </InputGroup>

            <button
              type="button"
              className="edp-stack-add-btn"
              onClick={handleStackAdd}
            >
              추가
            </button>

          </div>
        </div>

        {isDirty && (
          <div className="edp-save-bar">
            <span className="edp-save-text">
              프로필 변경을 하셨습니다. 아직 저장이 안되었는데 저장하시겠습니까?
            </span>
            <button className="edp-save-btn" onClick={handleSave}>
              저장하기
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditProfilePage;

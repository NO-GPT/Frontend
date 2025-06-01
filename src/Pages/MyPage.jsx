import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  const portfolioCount = 3;
  const totalItems = portfolioCount + 1;

  const [user, setUser] = useState({
    username: "userName", 
    email: "userName@gmail.com",
    name: "유저",
    affiliation: "학생",
    field: "개발자",
    birthdate: "2007/11/11",
    age: "만 17세",
    phone: "010-1111-1111",
    github: "userNameGithub",
    stacks: ["HTML", "Figma", "JavaScript"],
  });

  // 백엔드 연결
  useEffect(() => {
  }, []);

  return (
    <div className="myp-container">

      <div className="myp-hero">
      </div>
      {/* 메인 컨텐츠 */}
      <main className="myp-main">
        {/* 프로필 요약 */}
        <div className="myp-profile-summary">
          <div className="myp-profile-img" />
          <div className="myp-userinfo">
            <div className="myp-username">{user.username}</div>
            <div className="myp-useremail">{user.email}</div>
          </div>

          <button className="myp-edit-btn" onClick={() => navigate("edit")}>
            프로필 편집
          </button>
        </div>

        {/* 상세 정보 */}
        <div className="myp-details">
          <div className="myp-details-col">
            <div className="myp-detail-row">
              <div className="myp-label">이름</div>
              <div className="myp-value">{user.name}</div>
            </div>
            <div className="myp-detail-row">
              <div className="myp-label">소속</div>
              <div className="myp-value">{user.affiliation}</div>
            </div>
            <div className="myp-detail-row">
              <div className="myp-label">분야</div>
              <div className="myp-value">{user.field}</div>
            </div>
            <div className="myp-detail-row">
              <div className="myp-label">생년월일</div>
              <div className="myp-value">{user.birthdate}</div>
            </div>
            <div className="myp-detail-row">
              <div className="myp-label">보유 스택</div>
              <div className="myp-value">
                {user.stacks.map((s) => (
                  <div key={s} className="myp-stack">{s}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="myp-details-col">
            <div className="myp-detail-row">
              <div className="myp-label">나이</div>
              <div className="myp-value">{user.age}</div>
            </div>
            <div className="myp-detail-row">
              <div className="myp-label">전화번호</div>
              <div className="myp-value">{user.phone}</div>
            </div>
            <div className="myp-detail-row">
              <div className="myp-label">Github</div>
              <div className="myp-value">{user.github}</div>
            </div>
            <div className="myp-detail-row">
              <div className="myp-label">이메일</div>
              <div className="myp-value">{user.email}</div>
            </div>
          </div>
        </div>
        
        <div className="myp-portfolio-list">
          {Array.from({ length: totalItems }).map((_, idx) => {
            const isCreate = idx === totalItems - 1;

            return isCreate ? (
              <div
                key="create"
                className="myp-portfolio__item myp-portfolio__item--create"
                onClick={() => navigate("/create")}
              >
                +
              </div>
            ) : (
              <div key={idx} className="myp-portfolio__item">
                {/* 나중에 실제 포트폴리오 카드 컴포넌트로 교체 */}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MyPage;

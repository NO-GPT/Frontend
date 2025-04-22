import React, { useState, useEffect } from "react";

const MyPage = () => {
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

      <div className="myp-header">
        <img></img>
      </div>
      {/* 메인 컨텐츠 */}
      <main className="myp-main">
        {/* 프로필 요약 */}
        <div className="myp-profile-summary">
          <div className="myp-avatar" />
          <div className="myp-userinfo">
            <h2 className="myp-username">{user.username}</h2>
            <p className="myp-useremail">{user.email}</p>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="myp-details">
          <div className="myp-details-col">
            <div className="myp-detail-row">
              <span className="myp-label">이름</span>
              <span className="myp-value">{user.name}</span>
            </div>
            <div className="myp-detail-row">
              <span className="myp-label">소속</span>
              <span className="myp-value">{user.affiliation}</span>
            </div>
            <div className="myp-detail-row">
              <span className="myp-label">분야</span>
              <span className="myp-value">{user.field}</span>
            </div>
            <div className="myp-detail-row">
              <span className="myp-label">생년월일</span>
              <span className="myp-value">{user.birthdate}</span>
            </div>
            <div className="myp-detail-row">
              <span className="myp-label">보유 스택</span>
              <span className="myp-value">
                {user.stacks.map((s) => (
                  <span key={s} className="myp-badge">{s}</span>
                ))}
              </span>
            </div>
          </div>
          <div className="myp-details-col">
            <div className="myp-detail-row">
              <span className="myp-label">나이</span>
              <span className="myp-value">{user.age}</span>
            </div>
            <div className="myp-detail-row">
              <span className="myp-label">전화번호</span>
              <span className="myp-value">{user.phone}</span>
            </div>
            <div className="myp-detail-row">
              <span className="myp-label">Github</span>
              <span className="myp-value">{user.github}</span>
            </div>
            <div className="myp-detail-row">
              <span className="myp-label">이메일</span>
              <span className="myp-value">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="myp-portfolio-image" />
      </main>
    </div>
  );
};

export default MyPage;

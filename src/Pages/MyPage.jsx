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
                  <div key={s} className="myp-badge">{s}</div>
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
          <div className="myp-portfolio__item" />
          <div className="myp-portfolio__item" />
          <div className="myp-portfolio__item" />
          <div className="myp-portfolio__item" />
          <div className="myp-portfolio__item" />
          <div className="myp-portfolio__item" />
        </div>
      </main>
    </div>
  );
};

export default MyPage;

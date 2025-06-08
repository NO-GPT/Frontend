import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioCard from "../utils/PortfolioCard";

const MyPage = () => {
  const navigate = useNavigate();

  // 예시 데이터: 6개로 늘림
  const [ownPortfolios, setOwnPortfolios] = useState([
    {
      id: 1,
      title: "오즐 1",
      description:
        "오즐은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/1.png",
      likes: 2890,
    },
    {
      id: 2,
      title: "오즐 2",
      description:
        "오즐은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/2.png",
      likes: 1800,
    },
    {
      id: 3,
      title: "오즐 3",
      description:
        "오즐은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/3.png",
      likes: 2200,
    },
    {
      id: 4,
      title: "오즐 4",
      description:
        "오즐은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/4.png",
      likes: 3400,
    },
    {
      id: 5,
      title: "오즐 5",
      description:
        "오즐은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/5.png",
      likes: 1250,
    },
    {
      id: 6,
      title: "오즐 6",
      description:
        "오즐은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/6.png",
      likes: 970,
    },
  ]);

  const [likedPortfolios, setLikedPortfolios] = useState([
    {
      id: 7,
      title: "노닥노닥 1",
      description:
        "노닥노닥은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/1.png",
      likes: 2890,
      bookmarked: true,
    },
    {
      id: 8,
      title: "노닥노닥 2",
      description:
        "노닥노닥은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/2.png",
      likes: 1800,
      liked: true,
    },
    {
      id: 9,
      title: "노닥노닥 3",
      description:
        "노닥노닥은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/3.png",
      likes: 2200,
      liked: true,
    },
    {
      id: 10,
      title: "노닥노닥 4",
      description:
        "노닥노닥은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/4.png",
      likes: 3400,
      bookmarked: true,
    },
    {
      id: 11,
      title: "노닥노닥 5",
      description:
        "노닥노닥은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/5.png",
      likes: 1250,
      liked: true,
    },
    {
      id: 12,
      title: "노닥노닥 6",
      description:
        "노닥노닥은 지친 일상을 주변 사람들과 함께 즐거움을 찾는 네트워크 서비스입니다.",
      imageUrl: "/assets/imgs/test/6.png",
      likes: 970,
      liked: true,
    },  
  ]);

  // 마지막 create 카드를 포함한 카드의 갯수
  const totalOwnItems = ownPortfolios.length + 1;

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

  useEffect(() => {
    // API 호출
  }, []);

  return (
    <div className="myp-container">
      <div className="myp-hero" />

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
            {[
              { label: "이름", value: user.name },
              { label: "소속", value: user.affiliation },
              { label: "분야", value: user.field },
              { label: "생년월일", value: user.birthdate },
              {
                label: "보유 스택",
                value: user.stacks.map((s) => (
                  <div key={s} className="myp-stack">
                    {s}
                  </div>
                )),
              },
            ].map((row) => (
              <div key={row.label} className="myp-detail-row">
                <div className="myp-label">{row.label}</div>
                <div className="myp-value">{row.value}</div>
              </div>
            ))}
          </div>
          <div className="myp-details-col">
            {[
              { label: "나이", value: user.age },
              { label: "전화번호", value: user.phone },
              { label: "Github", value: user.github },
              { label: "이메일", value: user.email },
            ].map((row) => (
              <div key={row.label} className="myp-detail-row">
                <div className="myp-label">{row.label}</div>
                <div className="myp-value">{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 내 포트폴리오 */}
        <section className="myp-portfolio-section">
          <h2 className="myp-portfolio-title">내 포트폴리오</h2>
          <div className="myp-portfolio-list">
            {Array.from({ length: totalOwnItems }).map((_, idx) => {
              const isCreate = idx === totalOwnItems - 1; // 마지막 인지 체크
              return (
                <PortfolioCard
                  key={isCreate ? "create" : ownPortfolios[idx].id}
                  isCreate={isCreate}
                  item={isCreate ? null : ownPortfolios[idx]}
                  navigate={() => navigate("/create")}
                />
              );
            })}
          </div>
        </section>

        {/* 좋아요/북마크 포트폴리오 */}
        <section className="myp-portfolio-section">
          <h2 className="myp-portfolio-title">좋아요/북마크 포트폴리오</h2>
          <div className="myp-portfolio-list">
            {likedPortfolios.map((item) => (
              <PortfolioCard key={item.id} isCreate={false} item={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyPage;

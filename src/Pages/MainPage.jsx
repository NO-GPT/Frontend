import React from 'react';
import '../index.css';

const portfolioItems = [
  { id: 1, title: '포트폴리오 A', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 2, title: '포트폴리오 B', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 3, title: '포트폴리오 C', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 4, title: '포트폴리오 D', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 5, title: '포트폴리오 E', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 6, title: '포트폴리오 F', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 7, title: '포트폴리오 G', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 8, title: '포트폴리오 H', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 9, title: '포트폴리오 I', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 10, title: '포트폴리오 J', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 11, title: '포트폴리오 K', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
  { id: 12, title: '포트폴리오 L', img: '/assets/imgs/LoginPage_img.png', likes: 3283 },
];

const MainPage = () => {
  return (
    <>
      <div className="mp-hero-container">
        <div className="mp-hero-text">
          <div className="mp-hero-headline">
            포트폴리오 공유,<br />
            더 나은 커리어의 시작!
          </div>
          <button className="mp-hero-button">
            <span className="mp-hero-button-text">시작하기 &gt;</span>
          </button>
        </div>

        <div className="mp-hero-image">
          <img src="/assets/imgs/LoginPage_img.png" alt="이미지" />
        </div>
      </div>

      <div className="mp-container">
        <h1 className="mp-title">추천 포트폴리오</h1>
        <p className="mp-subtitle">다른 포트폴리오 구경하기</p>
        <div className="mp-portfolio-container">
          {portfolioItems.map(item => (
            <div key={item.id} className="mp-portfolio-item">
              <div className="mp-portfolio-like">
                <img 
                  src="/assets/imgs/Like_img.png" 
                  alt="포트폴리오 이미지" 
                  className="mp-like-img" 
                />
                <span className="mp-like-count">{item.likes}</span>
              </div>
              <div className="mp-portfolio-img">
                <img className="mp-portfolio-img" src={item.img} alt={item.title} />
              </div>
              <div className="mp-portfolio-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;

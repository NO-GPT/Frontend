import React from "react";
import { useNavigate } from "react-router-dom";

const PortfolioCard = ({
  item,         // 포트폴리오 데이터 객체
  isCreate,     // Boolean: cteate카드 일때 true
  navigate,     // create 카드 클릭 시 호출될 함수
}) => {

  if (isCreate) {
    return (
      <div
        className="myp-card myp-card--create"
        onClick={navigate}
      >
        <span className="myp-card-plus">+</span>
      </div>
    );
  }

  return (
    <div key={item.id} className="myp-card">
      <div className="myp-card-image-wrapper">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="myp-card-image"
        />
        <div className="myp-card-overlay" />
      </div>
      <div className="myp-card-body">
        <div className="myp-card-title">{item.title}</div>
        <div className="myp-card-desc">
          {item.description.length > 30
            ? item.description.slice(0, 30) + "..."
            : item.description}
        </div>
        <div className="myp-card-info">
          <div className="myp-card-likes">
            <img
              src="/assets/imgs/Like_img.png"
              alt="좋아요"
              className="myp-card-like-icon"
            />
            <span className="myp-card-like-count">
              {item.likes}
            </span>
          </div>
          {item.bookmarked && (
            <img
              src="/assets/imgs/bookmark-on.png"
              alt="북마크"
              className="myp-card-bookmark-icon"
            />
          )}
          {item.liked && (
            <img
              src="/assets/imgs/heart-on.png"
              alt="좋아요"
              className="myp-card-heart-icon"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PortfolioCard);

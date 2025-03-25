import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
      <div className="image-placeholder">
        <img className="login-img" src="/assets/imgs/LoginPage_img.png" alt="로그인 이미지" />
      </div>

        <div className="login-right">
          <h2 className="login-title">로그인</h2>
          <div className="title-underline"></div>

          <div className="input-group">
            <label>아이디</label>
            <input
              className="login-input"
              type="text"
              placeholder="아이디를 입력해주세요."
            />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              className="login-input"
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" className="remember-checkbox" /> <span>아이디 기억하기</span>
            </label>
            <span className="forgot-password">비밀번호를 잃어버리셨나요?</span>
          </div>

          <button className="login-btn">로그인</button>

          <p className="signup-link">
            계정이 아직 없으신가요? <Link to="/signup" className="signup-btn">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
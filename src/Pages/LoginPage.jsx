import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ field: "", message: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    if (!id.trim()) {
      setError({ field: "id", message: "아이디를 입력해주세요." });
    } else if (!password.trim()) {
      setError({ field: "password", message: "비밀번호를 입력해주세요." });
    } else {
      setError({ field: "", message: "" });
      // 로그인 처리 로직
      // 아이디 비밀번호가 틀렸을 시의 예외 처리 추가
    }
  };

  return (
    <div className="lp-container">
      <div className="lp-box">
        <div className="lp-image-placeholder">
          <img
            className="lp-img"
            src="/assets/imgs/LoginPage_img.png"
            alt="로그인"
          />
        </div>

        <div className="lp-right">
          <h2 className="lp-title">로그인</h2>
          <div className="lp-title-underline"></div>

          <form>
            <div className="lp-input-group">
              <label>아이디</label>
              <input
                className={`lp-input ${error.field === "id" ? "lp-input-error" : ""}`}
                type="text"
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  if (error.field === "id") setError({ field: "", message: "" });
                }}
              />
              {error.field === "id" && <p className="lp-error-message">{error.message}</p>}
            </div>

            <div className="lp-input-group">
              <label>비밀번호</label>
              <input
                className={`lp-input ${error.field === "password" ? "lp-input-error" : ""}`}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error.field === "password") setError({ field: "", message: "" });
                }}
              />
              {error.field === "password" && (
                <p className="lp-error-message">{error.message}</p>
              )}
            </div>

            <div className="lp-login-options">
              <label className="lp-remember-me">
                <input type="checkbox" className="lp-remember-checkbox" />{" "}
                <span>아이디 기억하기</span>
              </label>
              <span className="lp-forgot-password">비밀번호를 잃어버리셨나요?</span>
            </div>

            <button className="lp-login-btn" onClick={handleLogin}>
              로그인
            </button>
          </form>

          <p className="lp-signup-link">
            아직 계정이 없으신가요?{" "}
            <Link to="/signup" className="lp-signup-movement-btn">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

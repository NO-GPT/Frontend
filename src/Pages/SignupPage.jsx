import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [verification, setVerification] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState({ field: "", message: "" });

  const handleSignup = (e) => {
    e.preventDefault();

    if (!id.trim()) {
      setError({ field: "id", message: "아이디를 입력해주세요." });
    } else if (!email.trim()) {
      setError({ field: "email", message: "이메일을 입력해주세요." });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError({ field: "email", message: "유효한 이메일을 입력해주세요." });
    } else if (showVerification && !verification.trim()) {
      setError({ field: "verification", message: "인증번호를 입력해주세요." });
    } else if (!password.trim()) {
      setError({ field: "password", message: "비밀번호를 입력해주세요." });
    } else if (!passwordConfirm.trim()) {
      setError({ field: "passwordConfirm", message: "비밀번호 확인을 입력해주세요." });
    } else if (password !== passwordConfirm) {
      setError({ field: "passwordConfirm", message: "비밀번호가 일치하지 않습니다." });
    } else {
      setError({ field: "", message: "" });
      // 회원가입 처리 로직
    }
  };

  return (
    <div className="sp-container">
      <div className="sp-box">
        <div className="sp-image-placeholder">
          <img
            className="sp-img"
            src="/assets/imgs/LoginPage_img.png"
            alt="이미지"
          />
        </div>

        <div className="sp-right">
          <h2 className="sp-title">회원가입</h2>
          <div className="sp-title-underline"></div>

          <div className="sp-scroll-container">
            <form>
              <div className="sp-input-group">
                <label>아이디</label>
                <input
                  className={`sp-input ${error.field === "id" ? "sp-input-error" : ""}`}
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                    if (error.field === "id") setError({ field: "", message: "" });
                  }}
                />
                {error.field === "id" && <p className="sp-error-message">{error.message}</p>}
              </div>

              <div className="sp-input-group sp-email-group">
                <label>이메일</label>
                <div className="sp-email-input-container">
                  <input
                    className={`sp-input sp-email-input ${error.field === "email" ? "sp-input-error" : ""}`}
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error.field === "email") setError({ field: "", message: "" });
                    }}
                  />
                  <button
                    className="sp-verify-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowVerification(true);
                    }}
                  >
                    인증
                  </button>
                </div>
                {error.field === "email" && <p className="sp-error-message">{error.message}</p>}
              </div>

              {showVerification && (
                <div className="sp-input-group">
                  <label>인증번호</label>
                  <input
                    className={`sp-input ${error.field === "verification" ? "sp-input-error" : ""}`}
                    type="text"
                    placeholder="인증번호를 입력해주세요."
                    value={verification}
                    onChange={(e) => {
                      setVerification(e.target.value);
                      if (error.field === "verification") setError({ field: "", message: "" });
                    }}
                  />
                  {error.field === "verification" && (
                    <p className="sp-error-message">{error.message}</p>
                  )}
                </div>
              )}

              <div className="sp-input-group">
                <label>비밀번호</label>
                <input
                  className={`sp-input ${error.field === "password" ? "sp-input-error" : ""}`}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error.field === "password") setError({ field: "", message: "" });
                  }}
                />
                {error.field === "password" && <p className="sp-error-message">{error.message}</p>}
              </div>

              <div className="sp-input-group">
                <label>비밀번호 확인</label>
                <input
                  className={`sp-input ${error.field === "passwordConfirm" ? "sp-input-error" : ""}`}
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요."
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    if (error.field === "passwordConfirm") setError({ field: "", message: "" });
                  }}
                />
                {error.field === "passwordConfirm" && (
                  <p className="sp-error-message">{error.message}</p>
                )}
              </div>

              <button className="sp-signup-btn" onClick={handleSignup}>
                회원가입
              </button>
            </form>
            <p className="sp-login-link">
              이미 계정이 있으신가요?{" "}
              <Link to="/login" className="sp-login-movement-btn">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [showVerification, setShowVerification] = useState(false);

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="image-placeholder">
          <img className="signup-img" src="/assets/imgs/LoginPage_img.png" alt="회원가입 이미지" />
        </div>

        <div className="signup-right">
          <h2 className="signup-title">회원가입</h2>
          <div className="title-underline"></div>

          <div className="scroll-container">
            <div className="input-group">
              <label>아이디</label>
              <input className="signup-input" type="text" placeholder="아이디를 입력해주세요." />
            </div>

            <div className="input-group email-group">
              <label>이메일</label>
              <div className="email-input-container">
                <input className="signup-input email-input" type="email" placeholder="이메일을 입력해주세요."/>
                <button className="verify-btn" onClick={() => setShowVerification(true)}>인증</button>
              </div>
            </div>

            {showVerification && (
              <div className="input-group">
                <label>인증번호</label>
                <input className="signup-input" type="text" placeholder="인증번호를 입력해주세요." />
              </div>
            )}

            <div className="input-group">
              <label>비밀번호</label>
              <input className="signup-input" type="password" placeholder="비밀번호를 입력해주세요." />
            </div>

            <div className="input-group">
              <label>비밀번호 확인</label>
              <input className="signup-input" type="password" placeholder="비밀번호를 다시 입력해주세요." />
            </div>

            <button className="signup-btn">회원가입</button>

            <p className="login-link">
              이미 계정이 있으신가요? <Link to="/login" className="login-movement-btn">로그인</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

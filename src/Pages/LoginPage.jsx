import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import InputGroup from "../Components/InputGroup";
import InputBox from "../Components/InputBox";

const LoginPage = () => {
  const [id, setId] = useState("");                                    // 아이디
  const [password, setPassword] = useState("");                        // 비밀번호
  const [error, setError] = useState({ field: "", message: "" });      // 에러

  const clearError = useCallback(field => {                            // 에러 초기화 함수
    if (error.field === field) setError({ field: "", message: "" });
  }, [error.field]);

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    if (!id.trim()) {
      setError({ field: "id", message: "아이디를 입력해주세요." });
    } else if (!password.trim()) {
      setError({ field: "password", message: "비밀번호를 입력해주세요." });
    } else {
      setError({ field: "", message: "" });
      // 로그인 코드
    }
  }, [id, password]);

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
          <div className="lp-title">로그인</div>
          <div className="lp-title-underline"></div>

          <form onSubmit={handleLogin}>
            <InputGroup label="아이디" error={error.field === "id" && error.message}>
              <InputBox
                name="id"
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={setId}
                error={error.field === "id"}
                clearError={clearError}
              />
            </InputGroup>

            <InputGroup label="비밀번호" error={error.field === "password" && error.message}>
              <InputBox
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={setPassword}
                error={error.field === "password"}
                clearError={clearError}
              />
            </InputGroup>

            <div className="lp-login-options">
              <label className="lp-remember-me">
                <input type="checkbox" className="lp-remember-checkbox" />{" "}
                <span>아이디 기억하기</span>
              </label>
              <span className="lp-forgot-password">비밀번호를 잃어버리셨나요?</span>
            </div>

            <button className="lp-login-btn" type="submit">
              로그인
            </button>
          </form>

          <div className="lp-signup-link">
            아직 계정이 없으신가요?{" "}
            <Link to="/signup" className="lp-signup-movement-btn">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import InputGroup from "../Components/InputGroup"
import InputBox from "../Components/InputBox";

const SignupPage = () => {
  const [id, setId] = useState("");                                   // 아이디
  const [email, setEmail] = useState("");                             // 이메일
  const [verification, setVerification] = useState("");               // 인증번호
  const [password, setPassword] = useState("");                       // 비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState("");         // 비밀번호 확인

  const [showVerification, setShowVerification] = useState(false);    // 인증번호 입력란 표시 여부
  const [isCodeSent, setIsCodeSent] = useState(false);                // 인증번호 전송 여부
  const [timer, setTimer] = useState(180);                            // 타이머 기본 시간 (3분)
  const timerRef = useRef(null);                                      // 타이머 ref

  const [error, setError] = useState({ field: "", message: "" });     // 에러
  const clearError = useCallback(field => {                           // 에러 초기화 함수
    if (error.field === field) setError({ field: "", message: "" });
  }, [error.field]);

  useEffect(() => {
    if (!isCodeSent) return;
    const id = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(id);
  }, [isCodeSent]);

  // 타이머 숫자 변환
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(1, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  // 이메일 존재여부 확인 및 인증번호 입력칸 활성화, 타이머 시작
  const handleEmailVerify = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError({ field: "email", message: "이메일을 입력해주세요." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError({ field: "email", message: "유효한 이메일을 입력해주세요." });
      return;
    }
    setError({ field: "", message: "" });

    // 이메일 존재 여부 확인 코드 구현
    const exists = true; // await api.checkEmailExists(email);
    if (!exists) {
      setError({ field: "email", message: "존재하지 않는 이메일입니다." });
      return;
    }

    // 인증번호 전송 코드
    // await api.sendVerificationCode(email);

    setShowVerification(true);
    setIsCodeSent(true);
    setTimer(180);
  };

  const handleConfirmCode = async (e) => {
    e.preventDefault();
    if (!verification.trim()) {
      setError({ field: "verification", message: "인증번호를 입력해주세요." });
      return;
    }
    setError({ field: "", message: "" });

    // 인증번호 검즘 코드 구현
    const valid = false; // await api.verifyCode(email, verification);
    if (!valid) {
      setError({ field: "verification", message: "인증번호가 올바르지 않습니다." });
      return;
    }

    clearInterval(timerRef.current);
    // 인증 성공 처리
  };

  // 회원가입시
  const handleSignup = (e) => {
    e.preventDefault();
    if (!id.trim()) {
      setError({ field: "id", message: "아이디를 입력해주세요." });
    } else if (!email.trim()) {
      setError({ field: "email", message: "이메일을 입력해주세요." });
    } else if (showVerification && !isCodeSent) {
      setError({ field: "email", message: "이메일 인증을 먼저 완료해주세요." });
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
      // 회원가입 코드
      // await api.signup({ id, email, password });
    }
  };

  return (
    <div className="sp-container">
      <div className="sp-box">
        <div className="sp-image-placeholder">
          <img className="sp-img" src="/assets/imgs/LoginPage_img.png" alt="이미지" />
        </div>
        <div className="sp-right">
          <div className="sp-title">회원가입</div>
          <div className="sp-title-underline"></div>
          <div className="sp-scroll-container">
            <form>
              
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

              <InputGroup label="이메일" error={error.field === "email" && error.message}>
                <div className="sp-email-container">
                  <InputBox
                    name="email"
                    placeholder="이메일를 입력해주세요."
                    value={email}
                    onChange={setEmail}
                    error={error.field === "email"}
                    clearError={clearError}
                  />
                  <button className="sp-confirm-btn" onClick={handleEmailVerify}>인증</button>
                </div>
              </InputGroup>

              {showVerification && (
                <InputGroup label="인증번호" error={error.field === "verification" && error.message}>
                  <div className="sp-verification-container">
                    <InputBox
                      name="verification"
                      placeholder="인증번호를 입력해주세요."
                      value={verification}
                      onChange={setVerification}
                      error={error.field === "verification"}
                      clearError={clearError}
                    />
                    <div className="sp-timer">
                      {formatTime(timer)}
                    </div>
                    <button className="sp-confirm-btn" onClick={handleConfirmCode}>확인</button>
                  </div>
                </InputGroup>
              )}

              <InputGroup label="비밀번호" error={error.field === "password" && error.message}>
                <InputBox
                  name="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChange={setPassword}
                  error={error.field === "password"}
                  clearError={clearError}
                />
              </InputGroup>
              
              <InputGroup label="비밀번호 확인" error={error.field === "passwordConfirm" && error.message}>
                <InputBox
                  name="passwordConfirm"
                  placeholder="비밀번호를 다시 입력해주세요."
                  value={password}
                  onChange={setPasswordConfirm}
                  error={error.field === "passwordConfirm"}
                  clearError={clearError}
                />
              </InputGroup>

              <button className="sp-signup-btn" onClick={handleSignup}>회원가입</button>
            </form>

            <div className="sp-login-link">
              이미 계정이 있으신가요? <Link to="/login" className="sp-login-movement-btn">로그인</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

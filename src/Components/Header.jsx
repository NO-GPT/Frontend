import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span>ProjectLogo</span>
      </div>
      
      <nav className="nav-center">
        <Link to="/" className="nav-item nav-item-bold">메인페이지</Link>
        <Link to="/mypage" className="nav-item nav-item-bold">마이페이지</Link>
        <Link to="/portfolio" className="nav-item nav-item-bold">포트폴리오</Link>
      </nav>
      
      <div className="nav-right">
        <Link to="/login" className="nav-item">로그인</Link>
        <Link to="/signup" className="nav-item">회원가입</Link>
      </div>
    </header>
  );
};

export default Header;

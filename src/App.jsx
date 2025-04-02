import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import { MainPage, MyPage, PortfolioPage, LoginPage, SignupPage, PortfolioDetailPage } from './Pages';
import "./index.css";


const App = () => {
  return (
    <Router>
    <div className='main-container'>
    <Header />
      <div className='content'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolioDetail" element={<PortfolioDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
};

export default App;

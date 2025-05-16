import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import { 
  MainPage, 
  MyPage, 
  PortfolioPage, 
  LoginPage, 
  SignupPage, 
  PortfolioDetailPage,
  PortfolioCreatePage,
  } from './Pages';
import "./index.css";


const App = () => {
  return (
    <Router>
    <div className='container'>
    <Header />
      <div className='main-content'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolioDetail/:id" element={<PortfolioDetailPage />} />
          <Route path="/create" element={<PortfolioCreatePage />} />
          <Route path="/edit/:id" element={<PortfolioCreatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
};

export default App;

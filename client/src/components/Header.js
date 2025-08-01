import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            💰 Expense Tracker
          </Link>
          <nav className="nav">
            <Link to="/" className={isActive('/')}>
              Dashboard
            </Link>
            <Link to="/expenses" className={isActive('/expenses')}>
              Expenses
            </Link>
            <Link to="/add" className={isActive('/add')}>
              Add Expense
            </Link>
            <Link to="/analytics" className={isActive('/analytics')}>
              Analytics
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 
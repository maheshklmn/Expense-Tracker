import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, expensesRes] = await Promise.all([
          axios.get('/api/expenses/stats'),
          axios.get('/api/expenses?limit=5')
        ]);
        
        setStats(statsRes.data);
        setRecentExpenses(expensesRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      Food: '#FF6B6B',
      Transport: '#4ECDC4',
      Entertainment: '#45B7D1',
      Shopping: '#96CEB4',
      Bills: '#FFEAA7',
      Healthcare: '#DDA0DD',
      Education: '#98D8C8',
      Other: '#F7DC6F'
    };
    return colors[category] || '#6B7280';
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '32px', fontSize: '32px', fontWeight: '700' }}>
        Dashboard
      </h1>

      <div className="dashboard-grid">
        <div className="stats-card">
          <div className="stats-number">
            ${stats?.total?.toFixed(2) || '0.00'}
          </div>
          <div className="stats-label">Total Expenses</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-number">
            {recentExpenses.length}
          </div>
          <div className="stats-label">Recent Expenses</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-number">
            {stats?.categoryStats?.length || 0}
          </div>
          <div className="stats-label">Categories Used</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Recent Expenses</h2>
          <Link to="/expenses" className="btn btn-primary">
            View All
          </Link>
        </div>

        {recentExpenses.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6B7280', padding: '40px' }}>
            No expenses yet. <Link to="/add" style={{ color: '#3B82F6' }}>Add your first expense</Link>
          </p>
        ) : (
          <div>
            {recentExpenses.map((expense) => (
              <div key={expense._id} className="expense-item">
                <div className="expense-info">
                  <div className="expense-description">{expense.description}</div>
                  <div 
                    className="category-badge"
                    style={{ 
                      backgroundColor: getCategoryColor(expense.category) + '20',
                      color: getCategoryColor(expense.category)
                    }}
                  >
                    {expense.category}
                  </div>
                  <div className="expense-date">
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </div>
                </div>
                <div className="expense-amount">
                  ${expense.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/add" className="btn btn-primary">
            ➕ Add New Expense
          </Link>
          <Link to="/analytics" className="btn btn-secondary">
            📊 View Analytics
          </Link>
          <Link to="/expenses" className="btn btn-secondary">
            📋 All Expenses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
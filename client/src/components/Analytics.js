import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/expenses/stats');
        setStats(response.data);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error('Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

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
    return <div className="loading">Loading analytics...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!stats || stats.categoryStats.length === 0) {
    return (
      <div>
        <h1 style={{ marginBottom: '32px', fontSize: '32px', fontWeight: '700' }}>
          Analytics
        </h1>
        <div className="card">
          <p style={{ textAlign: 'center', color: '#6B7280', padding: '40px' }}>
            No data available for analytics. Add some expenses to see charts and insights!
          </p>
        </div>
      </div>
    );
  }

  // Prepare data for pie chart
  const pieData = stats.categoryStats.map((item, index) => ({
    name: item._id,
    value: item.total,
    color: COLORS[index % COLORS.length]
  }));

  // Prepare data for bar chart (monthly expenses)
  const barData = stats.monthlyStats.slice(-6).map(item => ({
    month: `${item._id.month}/${item._id.year}`,
    amount: item.total
  }));

  return (
    <div>
      <h1 style={{ marginBottom: '32px', fontSize: '32px', fontWeight: '700' }}>
        Analytics
      </h1>

      <div className="dashboard-grid">
        <div className="stats-card">
          <div className="stats-number">
            ${stats.total?.toFixed(2) || '0.00'}
          </div>
          <div className="stats-label">Total Expenses</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-number">
            {stats.categoryStats.length}
          </div>
          <div className="stats-label">Categories Used</div>
        </div>
        
        <div className="stats-card">
          <div className="stats-number">
            ${(stats.total / stats.categoryStats.length).toFixed(2)}
          </div>
          <div className="stats-label">Average per Category</div>
        </div>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">Expenses by Category</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">Monthly Expenses (Last 6 Months)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          Category Breakdown
        </h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {stats.categoryStats.map((category, index) => (
            <div key={category._id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: COLORS[index % COLORS.length]
                }} />
                <span style={{ fontWeight: '500' }}>{category._id}</span>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  ({category.count} expenses)
                </span>
              </div>
              <div style={{ fontWeight: '600', color: '#ef4444' }}>
                ${category.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          💡 Insights
        </h2>
        <div style={{ color: '#6B7280', lineHeight: '1.6' }}>
          {stats.categoryStats.length > 0 && (
            <>
              <p>
                <strong>Top spending category:</strong> {stats.categoryStats[0]._id} 
                (${stats.categoryStats[0].total.toFixed(2)})
              </p>
              <p>
                <strong>Total categories used:</strong> {stats.categoryStats.length}
              </p>
              <p>
                <strong>Average expense per category:</strong> ${(stats.total / stats.categoryStats.length).toFixed(2)}
              </p>
              {stats.monthlyStats.length > 1 && (
                <p>
                  <strong>Recent trend:</strong> {stats.monthlyStats.length >= 2 ? 
                    (stats.monthlyStats[stats.monthlyStats.length - 1].total > stats.monthlyStats[stats.monthlyStats.length - 2].total ? 
                      'Spending increased' : 'Spending decreased') : 'Not enough data'} 
                  in the last month
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics; 
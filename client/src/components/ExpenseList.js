import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editForm, setEditForm] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    notes: ''
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/expenses');
      setExpenses(response.data);
    } catch (err) {
      setError('Failed to load expenses');
      console.error('Fetch expenses error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`/api/expenses/${id}`);
        setExpenses(expenses.filter(expense => expense._id !== id));
      } catch (err) {
        setError('Failed to delete expense');
        console.error('Delete error:', err);
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense._id);
    setEditForm({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: format(new Date(expense.date), 'yyyy-MM-dd'),
      notes: expense.notes || ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/expenses/${editingExpense}`, editForm);
      setExpenses(expenses.map(expense => 
        expense._id === editingExpense ? response.data : expense
      ));
      setEditingExpense(null);
      setEditForm({
        description: '',
        amount: '',
        category: '',
        date: '',
        notes: ''
      });
    } catch (err) {
      setError('Failed to update expense');
      console.error('Update error:', err);
    }
  };

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
    return <div className="loading">Loading expenses...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '32px', fontSize: '32px', fontWeight: '700' }}>
        All Expenses
      </h1>

      {expenses.length === 0 ? (
        <div className="card">
          <p style={{ textAlign: 'center', color: '#6B7280', padding: '40px' }}>
            No expenses found. Start tracking your expenses!
          </p>
        </div>
      ) : (
        <div className="card">
          {expenses.map((expense) => (
            <div key={expense._id} className="expense-item">
              {editingExpense === expense._id ? (
                <form onSubmit={handleUpdate} style={{ width: '100%' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '16px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="form-input"
                      placeholder="Description"
                      required
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                      className="form-input"
                      placeholder="Amount"
                      required
                    />
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                      className="form-select"
                      required
                    >
                      <option value="">Category</option>
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Bills">Bills</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                      className="form-input"
                      required
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button type="submit" className="btn btn-primary btn-small">
                        Save
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary btn-small"
                        onClick={() => setEditingExpense(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
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
                    {expense.notes && (
                      <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                        {expense.notes}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="expense-amount">
                      ${expense.amount.toFixed(2)}
                    </div>
                    <div className="expense-actions">
                      <button 
                        onClick={() => handleEdit(expense)}
                        className="btn btn-secondary btn-small"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(expense._id)}
                        className="btn btn-danger btn-small"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList; 
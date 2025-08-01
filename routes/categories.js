const express = require('express');
const router = express.Router();

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get('/', (req, res) => {
  const categories = [
    { name: 'Food', color: '#FF6B6B', icon: '🍽️' },
    { name: 'Transport', color: '#4ECDC4', icon: '🚗' },
    { name: 'Entertainment', color: '#45B7D1', icon: '🎬' },
    { name: 'Shopping', color: '#96CEB4', icon: '🛍️' },
    { name: 'Bills', color: '#FFEAA7', icon: '📄' },
    { name: 'Healthcare', color: '#DDA0DD', icon: '🏥' },
    { name: 'Education', color: '#98D8C8', icon: '📚' },
    { name: 'Other', color: '#F7DC6F', icon: '📌' }
  ];
  
  res.json(categories);
});

module.exports = router; 
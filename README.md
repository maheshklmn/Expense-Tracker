# 💰 Expense Tracker

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for tracking personal expenses with beautiful analytics and insights.

## ✨ Features

- **📊 Dashboard**: Overview of total expenses, recent transactions, and quick stats
- **➕ Add Expenses**: Easy-to-use form to add new expenses with categories
- **📋 Expense Management**: View, edit, and delete expenses
- **📈 Analytics**: Beautiful charts showing spending patterns by category and over time
- **🎨 Modern UI**: Clean, responsive design with smooth animations
- **📱 Mobile Friendly**: Works perfectly on all devices
- **🔍 Categories**: Pre-defined expense categories with color coding
- **📝 Notes**: Add optional notes to expenses for better tracking

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Express Validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Chart library
- **Date-fns** - Date utilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/expense-tracker
   NODE_ENV=development
   PORT=5000
   ```

5. **Start the development servers**
   ```bash
   # Run both backend and frontend concurrently
   npm run dev
   
   # Or run them separately:
   # Backend only
   npm run server
   
   # Frontend only (in another terminal)
   npm run client
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
expense-tracker/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── models/                 # Mongoose models
│   └── Expense.js
├── routes/                 # API routes
│   ├── expenses.js
│   └── categories.js
├── server.js              # Express server
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Add new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats` - Get expense statistics

### Categories
- `GET /api/categories` - Get all categories

## 🎨 Features in Detail

### Dashboard
- Total expenses overview
- Recent transactions list
- Quick action buttons
- Category-based statistics

### Add Expense
- Form validation
- Category selection with icons
- Date picker
- Optional notes field
- Success feedback

### Expense List
- Sortable expense list
- Inline editing
- Delete confirmation
- Category color coding
- Date formatting

### Analytics
- Pie chart for category distribution
- Bar chart for monthly trends
- Category breakdown table
- Spending insights
- Responsive charts

## 🚀 Deployment

### Heroku Deployment
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Set environment variables in Heroku dashboard
5. Deploy using:
   ```bash
   git push heroku main
   ```

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update the `MONGO_URI` in your environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Charts from [Recharts](https://recharts.org/)
- Date utilities from [date-fns](https://date-fns.org/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ using the MERN stack 
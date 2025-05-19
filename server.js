const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models');

// Route imports
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);



// Start server after DB connection
const PORT = 3001;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});

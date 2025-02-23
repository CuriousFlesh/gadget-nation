const express = require('express');
const sequelize = require('./config/database');
const gadgetRoutes = require('./routes/gadgetRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes); 
app.use('/gadgets', gadgetRoutes);
const usersRouter = require('./routes/users');  
app.use('/api/users', usersRouter);


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the GADGET-NATION inventory' });
});

app.get('/api/users', (req, res) => {
  res.json({ message: "Users endpoint working!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});

module.exports = app;

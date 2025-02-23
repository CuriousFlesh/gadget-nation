const express = require('express');
const sequelize = require('./config/database');
const gadgetRoutes = require('./routes/gadgetRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes); 
app.use('/gadgets', gadgetRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'The GADGET-NATION inventory' });
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

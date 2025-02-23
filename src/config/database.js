const { Sequelize } = require('sequelize');
require('dotenv').config();

sslmode=require
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://gadget_nation_user:66pz8KELRX18fDy2dPCGIaSgWshwB9go@dpg-cutlpb9opnds739odstg-a.oregon-postgres.render.com/gadget_nation', {
  dialect: 'postgres',
  dialectOptions: 
  {
    
    ssl: {
      require: true,
      rejectUnauthorized: false
      
    }
  }
});

module.exports = sequelize;

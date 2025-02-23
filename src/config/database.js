const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://gadget_nation_user:66pz8KELRX18fDy2dPCGIaSgWshwB9go@dpg-cutlpb9opnds739odstg-a.oregon-postgres.render.com/gadget_nation', {
  dialect: 'postgres',
  logging: false, 
});

module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sesi_db', 'sesi_user', 'sesi123', {
  host: 'localhost',
  port: '3309',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
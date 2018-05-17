const conn = require('./conn');
const { Sequelize } = conn;

const Dancer = conn.define('dancer', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Dancer;

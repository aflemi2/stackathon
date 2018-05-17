const conn = require('./conn');
const { Sequelize } = conn;

const ImageURL = conn.define('imageURL', {
  name:{
    type: Sequelize.TEXT,
    unique: true
  }
});

module.exports = ImageURL;

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dance_machine_db',{logging:true});

module.exports = conn;

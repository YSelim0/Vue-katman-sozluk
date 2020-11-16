const Sequelize = require('sequelize');

module.exports = new Sequelize("katmansozluk" , "root" , null ,{
    host:"localhost",
    dialect:'mysql',
    port:3308
});
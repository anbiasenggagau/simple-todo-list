const { Sequelize } = require('sequelize')
const { MYSQL_DBNAME, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER } = require('../config/config')

const mySql = new Sequelize(MYSQL_DBNAME, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    logging: false
})

module.exports = mySql
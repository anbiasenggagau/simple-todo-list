const { DataTypes } = require('sequelize')
const mySql = require('./conecction')
const Todo = require('./Todos')

const Activity = mySql.define('activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: { msg: 'Please insert correct email' }
        }
    },
})

module.exports = Activity
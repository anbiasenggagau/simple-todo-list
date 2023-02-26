const { DataTypes } = require('sequelize')
const mySql = require('./conecction')
const Todo = require('./Todos')

const Activity = mySql.define('Activity', {
    activity_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: 'Please insert correct email' }
        }
    },
})

module.exports = Activity
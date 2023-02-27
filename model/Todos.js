const { DataTypes } = require('sequelize')
const mySql = require('./conecction')
const Activity = require('./Activities')

const priorityErrorMessage = 'Priority value is not allowed, these are allowed value : Very High, High, Medium, Low, Very Low'

const Todo = mySql.define('Todo', {
    todo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    activity_group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Activities',
            key: 'activity_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'very-high',
        validate: {
            isIn: {
                args: [['very-high', 'high', 'medium', 'low', 'very-low']],
                msg: priorityErrorMessage
            }
        }
    }
})

module.exports = Todo
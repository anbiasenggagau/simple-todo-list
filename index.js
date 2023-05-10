const express = require('express')
const mySql = require('./model/conecction')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const ActivityRouter = require('./Controller/ActivitiesController')
const Activity = require('./model/Activities')
const activitySeed = require('./model/seeding/activitiesSeeding')

const TodoRouter = require('./Controller/TodosController')
const Todo = require('./model/Todos')
const todoSeed = require('./model/seeding/todoSeeding')

app.use((req, res, next) => {
    console.log('Route : ' + req.path)
    console.log('Method : ' + req.method)
    console.log('Param : ')
    console.log(req.params)
    console.log('Query : ')
    console.log(req.query)
    console.log('Body : ')
    console.log(req.body)
    console.log()

    next()
})

app.use('/', ActivityRouter)
app.use('/', TodoRouter)

connectDatabse()

app.listen(3030, () => {
    console.log('Listening to port 3030')
})

function connectDatabse() {
    mySql.authenticate()
        .then(async () => {
            console.log('Connected to databse')
            await mySql.sync({ alter: true, force: true })
        })
        .catch(error => {
            console.log(error)
            console.log("\nTrying to reconnect in 5 seconds...")
            setTimeout(connectDatabse, 5000)
        });
}

async function seedDatabase() {
    try {
        const activityCount = await Activity.findAndCountAll()
        if (activityCount.count === 0) await Activity.bulkCreate(activitySeed, { validate: true })

        const todoCount = await Todo.findAndCountAll()
        if (todoCount.count === 0) await Todo.bulkCreate(todoSeed, { validate: true })
    } catch (error) {
        console.log(error)
    }
}
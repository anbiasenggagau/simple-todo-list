const router = require('express').Router()
const Todo = require('../model/Todos')

router.get('/todo-items', async (req, res) => {
    const { activity_group_id } = req.query
    let todos

    try {
        if (activity_group_id) todos = await Todo.findAll({ where: { activity_group_id } })
        else todos = await Todo.findAll()

        if (todos == 0) res.status(404).json({
            status: 'Not Found',
            message: 'Cannot find selected todos'
        })

        res.status(200).json({
            status: 'Success',
            message: 'Success',
            data: todos
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/todo-items/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id)
        if (todo !== null) return res.status(200).json({
            status: 'Success',
            message: 'Success',
            data: todo
        })

        res.status(404).json({
            status: 'Not Found',
            message: `Todo with ID ${req.params.id} Not Found`
        })

    } catch (error) {
        res.sendStatus(500)
    }
})

router.post('/todo-items', async (req, res) => {
    let { title, activity_group_id, is_active, priority } = req.body

    if (title === undefined || title === '') return res.status(400).json({ status: 'Bad Request', message: 'title cannot be null' })
    if (activity_group_id === undefined || activity_group_id === '') return res.status(400).json({ status: 'Bad Request', message: 'activity_group_id cannot be null' })
    if (is_active === undefined || is_active === '') return res.status(400).json({ status: 'Bad Request', message: 'is_active cannot be null' })
    if (priority === undefined) priority = 'very-high'

    try {
        try {
            const newTodo = await Todo.create({ title, activity_group_id, is_active, priority })
            res.status(201).json({
                status: 'Success',
                message: 'Success',
                data: newTodo
            })
        } catch (error) {
            res.status(400).json({ status: 'Bad Request', message: error.message })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

router.patch('/todo-items/:id', async (req, res) => {
    const { title, activity_group_id, is_active, priority } = req.body

    if (title === null || title === '') return res.status(400).json({ status: 'Bad Request', message: 'title cannot be null' })
    if (activity_group_id === null || activity_group_id === '') return res.status(400).json({ status: 'Bad Request', message: 'activity_group_id cannot be null' })
    if (is_active === null || is_active === '') return res.status(400).json({ status: 'Bad Request', message: 'is_active cannot be null' })
    if (priority === null || priority === '') return res.status(400).json({ status: 'Bad Request', message: 'priority cannot be null' })
    if (title === undefined && activity_group_id === undefined && is_active === undefined && priority === undefined) return res.status(400).json({
        status: 'Bad Request',
        message: 'body request cannot be null'
    })


    try {
        try {
            let newTodo = await Todo.update(
                {
                    title,
                    activity_group_id,
                    is_active,
                    priority
                }, {
                where: {
                    todo_id: req.params.id
                }
            }
            )

            if (newTodo[0] === 0) return res.status(404).json({
                status: 'Not Found',
                message: `Todo with ID ${req.params.id} Not Found`,
                data: {}
            })

            newTodo = await Todo.findByPk(req.params.id)
            res.status(200).json({
                status: 'Success',
                message: 'Success',
                data: newTodo
            })
        } catch (error) {
            res.status(400).json({ status: 'Bad Request', message: error.message })
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

router.delete('/todo-items/:id', async (req, res) => {
    try {
        const todo = await Todo.destroy({
            where: {
                todo_id: req.params.id
            }
        })

        if (todo === 0) return res.status(404).json({
            status: 'Not Found',
            message: `Todo with ID ${req.params.id} Not Found`,
            data: {}
        })

        res.status(200).json({
            status: 'Success',
            message: 'Success',
            data: {}
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router
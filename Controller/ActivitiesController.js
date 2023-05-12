const router = require('express').Router()
const Activity = require('../model/Activities')

router.get('/activity-groups', async (req, res) => {
    try {
        res.status(200).json({
            status: 'Success',
            message: 'Success',
            data: await Activity.findAll()
        })
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
})

router.get('/activity-groups/:id', async (req, res) => {
    try {
        const activity = await Activity.findByPk(req.params.id)
        if (activity !== null) return res.status(200).json({
            status: 'Success',
            message: 'Success',
            data: activity
        })

        res.status(404).json({
            status: 'Not Found',
            message: `Activity with ID ${req.params.id} Not Found`
        })

    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
})

router.post('/activity-groups', async (req, res) => {
    const { title, email } = req.body

    if (title === undefined || title === '') return res.status(400).json({ status: 'Bad Request', message: 'title cannot be null' })
    if (email === undefined || email === '') return res.status(400).json({ status: 'Bad Request', message: 'email cannot be null' })

    try {
        try {
            const newActivity = await Activity.create({ title, email })
            res.status(201).json({
                status: 'Success',
                message: 'Success',
                data: newActivity
            })
        } catch (error) {
            res.status(400).json({ status: 'Bad Request', message: error.message })
        }
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
})

router.patch('/activity-groups/:id', async (req, res) => {
    const { title, email } = req.body

    if (title === null || title === '') return res.status(400).json({ status: 'Bad Request', message: 'title cannot be null', data: {} })
    if (email === null || email === '') return res.status(400).json({ status: 'Bad Request', message: 'email cannot be null', data: {} })
    if (title === undefined && email === undefined) return res.status(400).json({ status: 'Bad Request', message: 'title cannot be null', data: {} })

    try {
        try {
            let newActivity = await Activity.update(
                {
                    title,
                    email
                }, {
                where: {
                    id: req.params.id
                }
            }
            )

            if (newActivity[0] === 0) return res.status(404).json({
                status: 'Not Found',
                message: `Activity with ID ${req.params.id} Not Found`,
                data: {}
            })

            newActivity = await Activity.findByPk(req.params.id)
            res.status(200).json({
                status: 'Success',
                message: 'Success',
                data: newActivity
            })
        } catch (error) {
            res.status(400).json({ status: 'Bad Request', message: error.message })
        }
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
})

router.delete('/activity-groups/:id', async (req, res) => {
    try {
        const activity = await Activity.destroy({
            where: {
                id: req.params.id
            }
        })

        if (activity === 0) return res.status(404).json({
            status: 'Not Found',
            message: `Activity with ID ${req.params.id} Not Found`,
            data: {}
        })

        res.status(200).json({
            status: 'Success',
            message: 'Success',
            data: {}
        })
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
})

module.exports = router
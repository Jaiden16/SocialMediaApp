const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./config')

router.get('/', async (req, res) => {
    let users = await db.any(`
        SELECT * 
        FROM users
    `)

    try {
        res.json({
            payload: users, 
            message: "Success you've reached /users"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})

router.get('/:username', async (req, res) => {
    let insertQuery = `
        SELECT * 
        FROM users
        WHERE username = ${Number(req.params.username)}
    `
    let user = await db.any(insertQuery)

    try {
        res.json({
            payload: user, 
            message: "Success you've reached /users"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})

router.post('/register', async (req, res) => {
    let insertQuery = 
        `INSERT INTO users(username, password, firstname, lastname, email, age, location, bio)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)`

    try {
        await db.none(insertQuery, [req.body.username, req.body.password, req.body.firstname, req.body.lastname, req.body.email, req.body.age, req.body.location, req.body.bio])
        res.json({
            payload: req.body, 
            message: 'POST request arrivesd at users/register',
        })
    } catch(error) {
        res.json({
            message: 'There was an error registering user.',
        })
    }
})

router.delete('/:username', async (req, res) => {
    let insertQuery = 
    `DELETE FROM users WHERE username = ${req.params.username}`

try {
    await db.none(insertQuery)
    res.json({
        payload: req.body, 
        message: 'POST request arrivesd at users/register',
    })
} catch(error) {
    res.json({
        message: 'There was an error registering user.',
    })
}
})

module.exports = router;
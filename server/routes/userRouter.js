const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./config')

router.get('/', async (req, res) => {
    console.log('reached endpoint users/')
    try {
        let users = await db.any(`
            SELECT * 
            FROM Users
        `)
        res.json({
            payload: users, 
            message: "Success you've reached /users"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'FAIL',
            error,
        })
    }
})

router.post('/', async (req, res) => {
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
            error, 
        })
    }
})

router.get('/:user_id', async (req, res) => {
    let insertQuery = `
        SELECT * 
        FROM users
        WHERE id = '${req.params.user_id}'
    `
    
    try {
        let user = await db.one(insertQuery)
        res.json({
            payload: user, 
            message: "Success you've reached /users"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: error,
        })
    }
})

router.delete('/:user_id', async (req, res) => {
    let insertQuery = 
    `DELETE FROM users WHERE id = '${req.params.user_id}'`

    try {
        await db.none(insertQuery)
        res.json({
            payload: req.body, 
            message: 'DELETE request arrived at users/:user_id',
        })
    } catch(error) {
        res.json({
            message: 'There was an error deleting user.',
            error, 
        })
    }
})

router.patch('/:user_id', async (req, res) => {
    let setQ = ''
    for (key in req.body) {
        let set = `${key} = '${req.body[key]}'`
        setQ += set + ','
    }
    setQ = setQ.slice(0, setQ.length - 1)
    
    let insertQuery = `
        UPDATE users
        SET ${setQ}
        WHERE id = '${req.params.user_id}'
    `

    try {
        await db.none(insertQuery)
        res.json({
            username: `${req.params.user_id}`,
            changes: req.body,
        })
    } catch(error) {
        res.json({
            message: 'There was an error',
            error,
        })
    }
})

module.exports = router;
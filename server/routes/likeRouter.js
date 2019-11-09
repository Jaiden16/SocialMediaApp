const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./config')

router.get('/', async (req, res) => {
    let likes = await db.any(`
        SELECT firstname, body 
        FROM likes 
        INNER JOIN users 
        ON likes.liker_id = users.id 
        INNER JOIN posts 
        ON likes.post_id = posts.id
        `)
    try {
        res.json({
            payload: likes, 
            message: "Success you've reached /likes"
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
        `INSERT INTO likes(liker_id, post_id)
            VALUES($1, $2)`

    try {
        await db.none(insertQuery, [req.body.liker_id, req.body.post_id])
        res.json({
            payload: req.body, 
            message: 'like request arrivesd at likes/register',
        })
    } catch(error) {
        res.json({
            message: 'There was an error registering like.',
        })
    }
})

module.exports = router;
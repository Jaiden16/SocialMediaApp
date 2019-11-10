const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./config')

router.get('/', async (req, res) => {
    console.log('you hit posts/ endpoint')
    let posts = await db.any(`
        SELECT *
        FROM posts 
    `)
    console.log(posts)
    try {
        res.json({
            payload: posts, 
            message: "Success you've reached /posts"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})

router.post('/', async (req, res) => {
    let insertQuery = `
        INSERT INTO posts(poster_id, body)
        VALUES($1, $2)
    `
    try {
        await db.none(insertQuery, [req.body.poster_id, req.body.body])
        res.json({
            payload: req.body, 
            message: 'POST request arrivesd at posts/register',
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'There was an error registering post.',
        })
    }
})

router.get('/:post_id', async (req, res) => {
    console.log('you hit posts/:post_id endpoint')
    try {
        let postByUser = await db.any(`
            SELECT *   
            FROM posts 
            WHERE id = $1
            `, [req.params.post_id]
        )
        res.json({
            payload: postByUser, 
            message: "Success you've reached /posts/:post_id"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error,
        })
    }
})

router.patch('/:post_id', async (req, res) => {
    console.log('you hit posts/:post_id endpoint')
    try {
        let postByUser = await db.any(`
            UPDATE posts
            SET body = '${req.body.body}'
            WHERE id = $1
            `, [req.params.post_id]
        )
        res.json({
            payload: postByUser, 
            message: "Success you've reached /posts/:post_id"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error,
        })
    }
})

router.delete('/:post_id', async (req, res) => {
    try {
        let payload = await db.none(`DELETE FROM posts WHERE id = ${req.params.post_id}`)
        res.json({
            payload,
            message: 'Successfully deleted post'
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'There was an error deleting post',
            error,
        })
    }
})

router.get('/user/:user_id', async (req, res) => {
    console.log('you hit posts/:user_id endpoint')
    try {
        let postByUser = await db.any(`
            SELECT *   
            FROM posts 
            INNER JOIN users
            ON posts.poster_id = users.id
            WHERE poster_id = $1
            `, [req.params.user_id]
        )
        res.json({
            payload: postByUser, 
            message: "Success you've reached /posts/:user_id"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error,
        })
    }
})

router.get('/likedBy/:liker_id', async (req, res) => {
    console.log('you hit posts/likedBy/:liker_id endpoint')
    try {
        let postsByLiker = await db.any(`
            SELECT *   
            FROM posts 
            INNER JOIN likes
            ON posts.id = likes.post_id
            WHERE liker_id = $1
            `, [req.params.liker_id]
        )
        res.json({
            payload: postsByLiker, 
            message: "Success you've reached /posts/likeBy/:liker_id"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error,
        })
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./config')

//gets feed list of all posts and the user who posted
router.get('/', async (req, res) => {
    console.log('you hit posts/ endpoint')
    // let posts = await db.any(`
    // SELECT 
    //     id, posts.poster_id, users.username AS User_name, ARRAY_AGG (posts.body) All_UserPosts
    // FROM posts, users
    // WHERE posts.poster_id = users.id
    // GROUP BY 
    //     User_name
    // ORDER BY 
    //     All_UserPosts DESC; 
    // `)
    let posts = await db.any(`
        SELECT 
            *
        FROM users, posts
        WHERE posts.poster_id = users.id 
    `)
    try {
        res.json({
            payload: posts, 
            message: "Success you've reached /posts"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error
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
            FROM users 
            INNER JOIN posts
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

router.get('/likes/:post_id', async (req, res) => {
    try {
        let count = await db.any(`
            SELECT *
            FROM likes
            INNER JOIN posts
            ON likes.post_id = post.id
            WHERE
        `)
        console.log(count)
        res.json({
            message: 'SUCCESS: GET/likes/:post_id',
            count
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'ERROR: GET/likes/:post_id',
            error
        })
    }
})

module.exports = router;
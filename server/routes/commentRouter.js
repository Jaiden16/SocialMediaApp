const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./config')

router.get('/', async (req, res) => {
    try {
        let comments = await db.any(`
            SELECT *
            FROM comments 
            `)
        res.json({
            payload: comments, 
            message: "Success you've reached /comments"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})

router.get('/posts/:post_id', async (req, res) => {
    try {
        let comment = await db.any(`
            SELECT *
            FROM comments 
            WHERE post_id = ${req.params.post_id}
            `)
        res.json({
            payload: comment, 
            message: "GET Success you've reached /comment/posts/:post_id"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})

router.post('/posts/:post_id/:commenter_id', async (req, res) => {
    try {
        await db.none(`
            INSERT INTO comments(post_id, body, commenter_id)
            VALUES($1, $2, $3)
            `, [req.params.post_id, req.body.body, req.params.commenter_id]
        )
        res.json({
            payload: [req.params.post_id, req.body.body, req.params.commenter_id], 
            message: "POST Success you've reached /comment/posts/:post_id/:commenter_id"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error
        })
    }
})

router.patch('/posts/:post_id/:commenter_id', async (req, res) => {
    try {
        await db.none(`
            UPDATE comments
            SET body = '${req.body.body}'
            WHERE post_id = ${req.params.post_id}
            AND commenter_id = ${req.params.commenter_id}
            `)
        res.json({
            payload: req.body.body, 
            message: "PATCH Success you've reached /comment/posts/:post_id/:commenter_id"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error
        })
    }
})

router.delete('/posts/:comment_id', async (req, res) => {
    try {
        await db.none(`
            DELETE FROM comments
            WHERE id = ${req.params.comment_id}
            `)
        res.json({
            payload: {}, 
            message: "DELETE Success you've reached /comment/posts/:comment_id"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error
        })
    }
})

module.exports = router;
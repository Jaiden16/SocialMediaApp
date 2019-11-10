const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./config')

router.get('/:user_id', async (req, res) => {
    try {
        let lurks = await db.any(`
            SELECT 
            *
            FROM lurks
            WHERE user_id = ${req.params.user_id}
        `)
        res.json({
            payload: lurks,
            message: "Success you've reached /lurks"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})

router.delete('/deleteLurk/:user_id/:lurker_username', async (req, res) => {
    try {
        await db.none(`
        DELETE FROM lurks
        WHERE user_id = ${req.params.user_id}
        AND lurker_username = '${req.params.lurker_username}'
        `)
        res.json({
            payload: [req.params.user_id, req.params.lurker_username],
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error
        })
    }
})

router.post('/addLurk/:user_id', async (req, res) => {
    try {
        await db.none(`
            INSERT INTO lurks(user_id, lurker_username)
            VALUES($1, $2)
        `, [req.params.user_id, req.body.lurker_username]
        )
        res.json({
            payload: [req.params.user_id, req.body.lurker_username],
            message: "Success you've reached /likes"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error
        })
    }

})

router.get('/')

module.exports = router;
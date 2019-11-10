const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./config')


// get all albums that belong to a user
router.get('/:owner_id', async (req, res) => {
    let user = req.params.owner_id 
    let albums = await db.any(`
        SELECT * FROM Albums WHERE user_owner_id = $1
        `, [user])
    try {
        res.json({
            payload: albums, 
            message: "Success you've reached /albums"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})


// create a new album for a user 
router.post('/:owner_id/:album_name', async (req, res) => {
    let user = req.params.owner_id 
    let albumName = req.params.album_name
    let albums = await db.none(`
        INSERT INTO Albums(user_owner_id, album_name)
        VALUES($1, $2)`, [user, albumName])
    try {
        res.json({
            payload: albums, 
            message: "Success you've reached /albums"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})


module.exports = router;
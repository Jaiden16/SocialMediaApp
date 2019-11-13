const express = require('express');
const router = express.Router();
const db = require('./config')

// get all photos from a single album
router.get("/albums/:album_id",async (req,res)=>{
    let album = req.params.album_id
    let pictures = await db.any(`
    SELECT * FROM Pictures WHERE album_id = $1`, [album])
    try{
        res.json({
            payload: pictures,
            message: "Success you've reached /Pictures"
        })
        
    }catch(err){
        res.json({
            message:"error",
            status: 400
        })
    }
})

// add a single photo to an album 
router.post("/albums/:album_id",async (req,res)=>{
    let album = req.params.album_id;
    let pic_url = req.body.url 
    let picture = await db.none(`INSERT into Pictures(album_id, pic) VALUES($1, $2)`, [album,pic_url])

    try{
        res.json({
            payload: picture,
            message: "Success you've reached /Pictures"
        })
        
    }catch(err){
        res.json({
            message:"error",
            status: 400
        })
    }
    
})

//ToDo delette a photo (to an album)
router.delete("/:pic_id",async (req,res)=>{
    let pic_id = req.params.pic_id
    try{
        await db.none(`
        DELETE FROM Pictures
        WHERE id = $1`, [pic_id])
        res.json({
            message:"Picture Deleted"
        })

    }catch(err){
        res.status(500)
        res.json({
            message: "error",
            err
            
        })
    }
})

module.exports = router;
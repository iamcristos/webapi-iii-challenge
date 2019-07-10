const express = require('express');
const db= require('./postDb');
const {validatePostId, validatePost} = require('../middleware/middleware');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await db.get()
        if(!posts.length){
            return res.status(200).json({
                status:200,
                message: "Posts is empty"
            })
        }
        res.status(200).json({
            status:200,
            posts
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            message: "Error getting posts"
        })
    }
});

router.get('/:id',validatePostId ,(req, res) => {
    const {post} = req;
    res.status(200).json({
        status:200,
        post
    })
});

router.delete('/:id', validatePostId,async (req, res) => {
    try {
        const post = await db.remove(req.params.id)
        res.status(200).json({
            status:200,
            message: "post deleted succesfully"
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            message: "Error cannot delete post"
        })
    }
});

router.put('/:id', validatePostId, validatePost,async (req, res) => {
    const { id } = req.params;
    const {body} = req;
    try {
        const post = await db.update(id, body)
        res.status(200).json({
            status:200,
            post
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"Error updating user"
        })
    }

});

// custom middleware



module.exports = router;
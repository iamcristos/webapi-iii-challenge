const express = require('express');
const db= require('./postDb');
const {validatePostId, validatePost, validateId} = require('../middleware/middleware');
const {errorHelper, successHelper} = require('../helpers');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await db.get()
        if(!posts.length){
            return errorHelper(res, 200, "Posts is empty")
        }
        return successHelper(res, 200, posts)
    } catch (error) {
        return errorHelper(res, 500, "Error getting posts")
    }
});

router.get('/:id',validateId, validatePostId ,(req, res) => {
    const {post} = req;
    return successHelper(res, 200, post);
});

router.delete('/:id', validateId,validatePostId,async (req, res) => {
    try {
        const post = await db.remove(req.params.id)
        return successHelper(res, 200, "post deleted succesfully")
    } catch (error) {
        return errorHelper(res, 500, "Error cannot delete post")
    }
});

router.put('/:id', validateId,validatePostId, validatePost,async (req, res) => {
    const { id } = req.params;
    const {body} = req;
    try {
        const post = await db.update(id, body)
        return successHelper(res, 200, post)
    } catch (error) {
        return errorHelper(res, 500, "Error updating user")
    }

});

// custom middleware



module.exports = router;
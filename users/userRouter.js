const express = require('express');
const { validateUser, validateUserId } = require('../middleware/middleware')
const db = require('./userDb');
const postDb = require('../posts/postDb');
const {errorHelper, successHelper} = require('../helpers');

const router = express.Router();

router.post('/', validateUser,async (req, res) => {
    const { body } = req;
    try {
        const newUser = db.insert(body);
        if(!newUser){
            return errorHelper(res, 400, "user already exists")
        }
        successHelper(res, 201, newUser)
    } catch (error) {
        return errorHelper(res, 500, "Error adding user")
    }
});

router.post('/:id/posts', validateUserId,async(req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const newPost = {
            ...body,
            user_id:id
        }
        const post = await postDb.insert(newPost)
        console.log(post)
        successHelper(res, 201, post)
    } catch (error) {
        console.log(error.message)
        return errorHelper(res, 500, "Error can't post")
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await db.get()
        if(!users.length) {
            return errorHelper(res, 200, "no users")
        }
        return successHelper(res, 200, users)
    } catch (error) {
        return errorHelper(res, 500, "Error loading users")
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    try {
        const {user} = req;
        return successHelper(res, 200, user);
    } catch (error) {
        return errorHelper(res, 500, "Error cannot get user")
    }
});

router.get('/:id/posts', validateUserId,async (req, res) => {
    const {id} = req;
    try {
        const posts = await db.getUserPosts(id)
        if(!posts.length) {
            return errorHelper(res, 200, "No Post for this user")
        }
        return successHelper(res, 200, posts)
    } catch (error) {
        return errorHelper(res, 500, "Error getting post")
    }
});

router.delete('/:id', validateUserId,async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.remove(id);
        return successHelper(res, 200,"User deleted" )
    } catch (error) {
        return errorHelper(res, 500, "Error cannot delete User");
    }
});

router.put('/:id', validateUserId, validateUser, async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
       const user = await db.update(id, body);
       return successHelper(res, 200, user);
    } catch (error) {
        return errorHelper(res, 500, "Error updating user")
    }
});


module.exports = router;

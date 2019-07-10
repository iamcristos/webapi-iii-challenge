const express = require('express');
const { validateUser, validateUserId } = require('../middleware/middleware')
const db = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser,async (req, res) => {
    const { body } = req;
    try {
        const newUser = db.insert(body);
        if(!newUser){
            return res.status(400).json({
                status: 400,
                message: "user already exists"
            })
        }
        res.status(201).json({
            status:201,
            newUser
        });
    } catch (error) {
        return res.status(500).json({
            status:500,
            message: "Error adding user"
        })
    }
});

router.post('/:id/posts', validateUserId,async(req, res) => {
    const { body } = req;

});

router.get('/', async (req, res) => {
    try {
        const users = await db.get()
        if(!users.length) {
            return res.status(200).json({
                status:200,
                message: "no users"
            })
        }
        res.status(200).json({
            status:200,
            users
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message: "Error loading users"
        })
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    try {
        const {user} = req;
        return res.status(200).json({
            status:200,
            user
        });
    } catch (error) {
        return res.status(500).json({
            status:500,
            message: "Error cannot get user"
        })
    }
});

router.get('/:id/posts', validateUserId,async (req, res) => {
    const {id} = req;
    try {
        const posts = await db.getUserPosts(id)
        if(!posts.length) {
            return res.status(200).json({
                status:200,
                message: "No Post for this user"
            })
        }
        res.status(200).json({
            status:200,
            posts
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error getting post"
        })
    }
});

router.delete('/:id', validateUserId,async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.remove(id);
        res.status(200).json({
            status:200,
            message: "User deleted"
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message: "Error cannot delete User"
        })
    }
});

router.put('/:id', validateUserId, validateUser, async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
       const user = await db.update(id, body)
       if(!user){
           return res.status(400).json({
               status: 400,
               message: "user already exists"
           })
       }
       res.status(200).json({
           status:200,
           user
       }) 
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error updating user"
        })
    }
});


module.exports = router;

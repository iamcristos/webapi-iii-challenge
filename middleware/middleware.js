const db = require('../users/userDb');
const postDb = require('../posts/postDb');
const {errorHelper} = require('../helpers');

function logger(req,res,next) {
    console.log(
        `method:${req.method}, 
        url:${req.url}, 
        date:${new Date().toISOString()} `
        )
        next()
};

function validateId(req,res,next) {
    const { id } = req.params;
    if(!Number(id)){
        return errorHelper(res, 400, "Invalid Id")
    }

    next()
}

async function validateUserId(req,res,next) {
    const { id } = req.params;
    try {
        const user = await db.getById(id)
        if (!Object.keys(user)) {
           return errorHelper(res,404,"User not found")
        }
        req.user = user
    } catch (error) {
       return errorHelper(res,500,"Could not get User")
    };
    next();
};

async function validateUser(req,res,next) {
    const {body} = req;
    if (!Object.keys(body)) {
       return errorHelper(res,400,"missing body")
    }
    const {name} = body;
    if(!name.trim()) {
       return errorHelper(res,400,"missing users name")
    }
    next()
};

async function validatePost(req,res,next) {
    const {body} = req;
    if (!Object.keys(body)) {
       return errorHelper(res, 400, "missing body")
    }
    const {text} = body;
    if(!text.trim()) {
       return errorHelper(res, 400, "missing post text")
    }
    next()
}

async function validatePostId(req, res, next) {
    const { id } = req.params;
    try {
        const post = await postDb.getById(id)
        if(!Object.keys(post).length) {
            return errorHelper(res, 404, "Post not found")
        }
        req.post = post;
    } catch (error) {
        return errorHelper(res, 500, "Error getting posts")
    }
    next()
};

module.exports = {logger, 
    validateId, 
    validateUserId,
     validateUser, 
     validatePost, 
     validatePostId};
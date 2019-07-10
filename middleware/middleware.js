const db = require('../users/userDb');

function logger(req,res,next) {
    console.log(
        `method:${req.method}, 
        url:${req.url}, 
        date:${new Date().toISOString()} `
        )
        next()
};

async function validateUserId(req,res,next) {
    const { id } = req.params;
    try {
        const user = await db.getById(id)
        if (!user.length) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            })
        }
        req.user = user
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Could not get User"
        })
    };
    next();
};

async function validateUser(req,res,next) {
    const {body} = req;
    if (!body.length) {
        return res.status(400).json({
            status: 400,
            message: "missing body"
        })
    }
    const {name} = body;
    if(!name.trim()) {
        return res.status(400).json({
            status:400,
            message: "missing users name"
        })
    }
    next()
};

async function validatePost(req,res,next) {
    const {body} = req;
    if (!body.length) {
        return res.status(400).json({
            status: 400,
            message: "missing body"
        })
    }
    const {text} = body;
    if(!text.trim()) {
        return res.status(400).json({
            status:400,
            message: "missing post text"
        })
    }
    next()
}

module.exports = {logger, validateUserId, validateUser, validatePost}
function logger(req,res,next) {
    console.log(
        `method:${req.method}, 
        url:${req.url}, 
        date:${new Date().toISOString()} `
        )
        next()
}

module.exports = {logger}
function errorHelper(res,status,message) {
    return res.status(status).json({
        status: status,
        message
    })
}

module.exports = {errorHelper};
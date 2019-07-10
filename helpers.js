function errorHelper(res,status,message) {
    return res.status(status).json({
        status,
        message
    })
}

function successHelper(res,status,data) {
   return res.status(status).json({
        status,
        data
    });
}

module.exports = {errorHelper, successHelper};

function checkValidSession(req, res, next){
    if(req.session.userid){
        next();
    }
    else{
        return res.status(401).json({
            status: "failed",
            message: "authentication failed"
        });
    }
}

module.exports = { checkValidSession };

function logout(req, res){
    if(req.session.userid){
        req.session.destroy((error)=>{
            if(error){
                console.log(error);
                return res.status(500).send("server error");
            }

            res.clearCookie('connect.sid');
            return res.json({
                status: "success",
                message: "logged out successfully"
            });
        })
    }
    else{
        return res.status(400).json({
            status: "failed",
            message: "user session invalid"
        }); 
    }

}

module.exports = logout;
const db = require("../../../DB/mysqlConfig.js");
const bcrypt = require('bcrypt');
function validate(req, res) {
    const { email, userpassword } = req.body;
    if (!email || !userpassword) {
        res.status(403).json({
            status: "failed",
            message: "invalid credentials"
        });
        return -1;
    }
}

async function login(req, res){
    if (validate(req, res) == -1) {
        return -1;
    }
    try{
        const { email, userpassword } = req.body;
        const [results, fields] = await db.execute(
            'SELECT Userid, UserName, Email, UserPassword, Joined FROM Users WHERE Email = ?',
            [email]
        );
        if(results.length == 0){
            return res.status(400).json({
                status: "failed",
                message: "User not registered"
            });
        }
        const user = results[0];

        const passwordMatch = await bcrypt.compare(userpassword, user.UserPassword);
        
        if(passwordMatch){
            req.session.userid = user.Userid;
            return res.json({
                status: "success",
                message: "login successful",
                user: {
                    userid: user.Userid,
                    username: user.UserName,
                    email: user.Email,
                    joined: user.Joined
                }
            });
        }
        else{
            res.status(401).json({
                status: "failed",
                message: "Invalid credentials"
            });
        }
    } catch(error){
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "internal server error"
        });
    }
}

module.exports = login;
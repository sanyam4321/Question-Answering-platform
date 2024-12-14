const { v4: uuidv4 } = require('uuid');
const db = require("../../../DB/mysqlConfig.js");
const bcrypt = require('bcrypt');
function validate(req, res) {
    const { username, email, userpassword } = req.body;
    if (!username || !email || !userpassword) {
        res.status(403).json({
            status: "failed",
            message: "invalid credentials"
        });
        return -1;
    }
}

async function signup(req, res) {
    if (validate(req, res) == -1) {
        return -1;
    }
    try {
        const { username, email, userpassword } = req.body;
        const userid = uuidv4();

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(userpassword, saltRounds);
        await db.execute(
            'INSERT INTO Users (Userid, Username, Email, UserPassword) VALUES ( ?, ?, ?, ?)',
            [userid, username, email, hashedPassword]
        );
        req.session.userid = userid;
        return res.json({
            status: "success",
            message: "signup successful"
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "internal server error"
        });
    }
}

module.exports = signup;
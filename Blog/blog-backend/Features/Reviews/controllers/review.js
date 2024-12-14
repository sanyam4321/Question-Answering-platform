const db = require("../../../DB/mysqlConfig");
const { v4: uuidv4 } = require('uuid');

function validate(req, res) {
    const { blogid, reaction } = req.body;
    if (!blogid || !reaction) {
        res.status(400).json({
            status: "failed",
            message: "Reaction invalid"
        });
        return -1;
    }
}
async function reviewBlog(req, res){
    if (validate(req, res) == -1) {
        return -1;
    }
    try{
        const { blogid } = req.body;
        const reaction = req.body.reaction === "1" ? 1 : 0;
        const userid = req.session.userid;
        const reactionid = uuidv4();

        const [ results, fields ] = await db.execute(
            'SELECT Userid FROM Reactions WHERE Blogid = ? AND Userid = ?',
            [blogid, userid]
        );
        if(results.length > 0){
            return res.status(400).json({
                status: "failed",
                message: "Already commented on this blog"
            })
        }
        await db.execute(
            'INSERT INTO Reactions (Reactionid, Blogid, Userid, Reaction) VALUES (?, ?, ?, ?)',
            [reactionid, blogid, userid, reaction]
        );
        res.status(200).json({
            status: "success",
            message: "Reacted successfully"
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "internal server error"
        });
    }
}

module.exports = reviewBlog;
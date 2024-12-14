const db = require("../../../DB/mysqlConfig");
const { v4: uuidv4 } = require('uuid');

function validate(req, res) {
    const { blogid, content } = req.body;
    if (!blogid || !content) {
        res.status(400).json({
            status: "failed",
            message: "Please fill the comment"
        });
        return -1;
    }
}

async function createComment(req, res) {
    if (validate(req, res) == -1) {
        return -1;
    }
    try {
        const { blogid, content } = req.body;
        const userid = req.session.userid;
        const commentid = uuidv4();

        await db.execute(
            'INSERT INTO Comments (Commentid, Blogid, Userid, Content) VALUES (?, ?, ?, ?)',
            [commentid, blogid, userid, content]
        );
        res.status(200).json({
            status: "success",
            message: "Commented successfully"
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "internal server error"
        });
    }

}
module.exports = createComment;
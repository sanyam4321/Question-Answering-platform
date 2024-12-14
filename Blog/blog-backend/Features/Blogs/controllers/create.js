const db = require("../../../DB/mysqlConfig");
const { v4: uuidv4 } = require('uuid');

function validate(req, res) {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({
            status: "failed",
            message: "incorrect blog format"
        });
        return -1;
    }
}

async function createBlog(req, res){
    if (validate(req, res) == -1) {
        return -1;
    }
    try {
        const userid = req.session.userid;
        const { title, content } = req.body;
        const blogid = uuidv4();
        await db.execute(
            'INSERT INTO Blogs (Blogid, Userid, Title, Content) VALUES (?, ?, ?, ?)',
            [blogid, userid, title, content]
        );
        return res.status(200).json({
            status: "success",
            message: "blog created successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "Server Error"
        });
    }
}

module.exports = createBlog;
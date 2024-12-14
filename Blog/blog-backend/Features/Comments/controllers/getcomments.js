const db = require("../../../DB/mysqlConfig");

async function getcomments(req, res) {
    try {
        const blogid = req.params.blogid;

        if (!blogid) {
            return res.status(400).json({
                status: "failed",
                message: "blog id invalid"
            });
        }
        const [results, fields] = await db.execute(
            'SELECT c.Commentid, c.Content, c.Commented, u.Username FROM Comments AS c INNER JOIN Users AS u ON c.Userid = u.Userid WHERE c.Blogid = ?',
            [blogid]
        );
        res.status(200).json({
            status: "success",
            message: results.length > 0 ? "comments fetched successfully" : "no comments found",
            comments: results.length > 0 ? results: null
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "internal server error"
        });
    }

}
module.exports = getcomments;
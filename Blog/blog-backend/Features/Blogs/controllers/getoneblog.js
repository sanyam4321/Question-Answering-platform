const db = require("../../../DB/mysqlConfig");

async function getoneblog(req, res){
    try {
        const blogid = req.params.blogid;
        if(!blogid){
            return res.status(400).json({
                status: "failed",
                message: "blog id invalid"
            });
        }
        const [ results, fields ] = await db.execute(
            'SELECT b.Blogid, b.Title, b.Content, b.Created, u.UserName, SUM(CASE WHEN r.Reaction = TRUE THEN 1 ELSE 0 END) AS PositiveReactions, SUM(CASE WHEN r.Reaction = FALSE THEN 1 ELSE 0 END) AS NegativeReactions FROM Blogs b LEFT JOIN Users u ON b.Userid = u.Userid LEFT JOIN Reactions r ON b.Blogid = r.Blogid WHERE b.Blogid = ? GROUP BY b.Blogid, b.Title, b.Content, b.Created, u.UserName',
            [blogid]
        );
        return res.status(200).json({
            status: "success",
            message: results.length > 0 ? "blog fetched successfully" : "blog does not exist",
            blog: results.length > 0 ? results[0] : null
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "internal server error"
        });
    }
}
module.exports = getoneblog;
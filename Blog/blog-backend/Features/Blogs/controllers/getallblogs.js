const db = require("../../../DB/mysqlConfig");
async function getallblogs(req, res){
    try{
        const pageNumber = parseInt(req.params.pageno);
        if(pageNumber < 1 || !pageNumber){
            return res.status(400).json({
                status: "failed",
                message: "invalid page number"
            });
        }
        const pageSize = 5;
        const offset = (pageNumber - 1) * pageSize;
        const [ results, fields ]  = await db.execute(
            "SELECT b.Blogid, b.Title, b.Content, b.Created, u.UserName, SUM(CASE WHEN r.Reaction = TRUE THEN 1 ELSE 0 END) AS PositiveReactions, SUM(CASE WHEN r.Reaction = FALSE THEN 1 ELSE 0 END) AS NegativeReactions FROM Blogs b LEFT JOIN Users u ON b.Userid = u.Userid LEFT JOIN Reactions r ON b.Blogid = r.Blogid GROUP BY b.Blogid, b.Title, b.Content, b.Created, u.UserName ORDER BY b.Created DESC LIMIT ? OFFSET ?",
            [String(pageSize + 1), String(offset)]
        );

        const isMore = results.length > pageSize ? "true" : "false";
        return res.status(200).json({
            status: "success",
            message: results.length > 0 ? `page number: ${pageNumber} blogs fetched successfully` : "No more blogs available",
            more: isMore,
            blogs: results.length > pageSize ? results.slice(0, -1) : results
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "internal server error"
        });
    }
}

module.exports = getallblogs;
const express = require("express");
const router = express.Router();
const { checkValidSession } = require("../../middlewares/auth");
const createBlog = require("./controllers/create");
const getallblogs = require("./controllers/getallblogs");
const getoneblog = require("./controllers/getoneblog");
const getownblogs = require("./controllers/getownblogs");

router.use(checkValidSession);

/* /api/v1/blog/create */
router.post("/create", createBlog);

/* /api/v1/blog/getallblogs/:pageno */
router.get("/getallblogs/:pageno", getallblogs);

/* /api/v1/blog/getownblogs/:pageno */
router.get("/getownblogs/:pageno", getownblogs);

/* /api/v1/blog/getoneblog/:blogid */
router.get("/getoneblog/:blogid", getoneblog);

module.exports = router;
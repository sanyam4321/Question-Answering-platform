const express = require("express");
const router = express.Router();
const { checkValidSession } = require("../../middlewares/auth");
const getcomments = require("./controllers/getcomments");
const createComment = require("./controllers/create");

router.use(checkValidSession);

/* /api/v1/comment/getcomments/:blogid */

router.get("/getcomments/:blogid", getcomments)

/* /api/v1/comment/create */

router.post("/create", createComment);

module.exports = router;
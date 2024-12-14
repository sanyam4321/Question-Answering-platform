const express = require("express");
const router = express.Router();
const { checkValidSession } = require("../../middlewares/auth");
const reviewBlog = require("./controllers/review");

router.use(checkValidSession);

/* /api/v1/review */

router.post("/", reviewBlog);



module.exports = router;
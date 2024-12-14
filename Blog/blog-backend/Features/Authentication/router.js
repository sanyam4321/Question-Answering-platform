const express = require("express");
const signup = require("./controllers/signup");
const login = require("./controllers/login");
const logout = require("./controllers/logout");
const { checkValidSession } = require("../../middlewares/auth");
const router = express.Router();

/* /api/v1/auth/signup */
router.post("/signup", signup);
/* /api/v1/auth/login */
router.post("/login", login);
/* /api/v1/auth/logout */
router.delete("/logout", checkValidSession, logout);


module.exports = router;
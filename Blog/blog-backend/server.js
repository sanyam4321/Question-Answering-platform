const express = require("express");
const cors = require('cors');
require("dotenv/config");
require("./DB/mysqlConfig.js");
const session = require('express-session');
const { RedisStore } = require("connect-redis")
const Redis = require('ioredis');

const app = express();
const port = process.env.PORT || 8000;


app.use(cors({
  origin: process.env.CLIENT_DOMAIN,
  credentials: true
}));

app.use(express.json());

const redisClient = new Redis(process.env.REDIS_URL);
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_KEY,
    resave: false,        
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);

const authR = require("./Features/Authentication/router.js");
const blogR = require("./Features/Blogs/router.js");
const commentR = require("./Features/Comments/router.js");
const reviewR = require("./Features/Reviews/router.js");

app.use("/api/v1/auth", authR);
app.use("/api/v1/blog", blogR);
app.use("/api/v1/comment", commentR);
app.use("/api/v1/review", reviewR);

app.get("/", (req, res) => {
  res.send("Blog Platform");
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port: ${port}`);
});

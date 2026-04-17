const express = require("express");
const { createPost, getPosts } = require("../controllers/post.controller");

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);

module.exports = router;

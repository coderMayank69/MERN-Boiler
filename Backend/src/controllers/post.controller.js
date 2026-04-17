const { StatusCodes } = require("http-status-codes");
const postModel = require("../models/post.model");
const { createPostSchema } = require("../validations/post.validation");

async function createPost(req, res) {
  const parsedBody = createPostSchema.parse(req.body);

  const post = await postModel.create({
    title: parsedBody.title,
    content: parsedBody.content,
    imageUrl: parsedBody.imageUrl || "",
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
}

async function getPosts(req, res) {
  const limit = Math.min(Number(req.query.limit) || 20, 100);

  const posts = await postModel.find().sort({ createdAt: -1 }).limit(limit);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Posts fetched successfully",
    data: posts,
  });
}

module.exports = {
  createPost,
  getPosts,
};

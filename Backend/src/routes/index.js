const express = require("express");
const healthRoutes = require("./health.routes");
const postRoutes = require("./post.routes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/posts", postRoutes);

module.exports = router;

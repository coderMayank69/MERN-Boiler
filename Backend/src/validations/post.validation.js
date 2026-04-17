const { z } = require("zod");

const createPostSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(120),
  content: z.string().trim().min(10, "Content must be at least 10 characters").max(5000),
  imageUrl: z.string().trim().url("imageUrl must be a valid URL").optional().or(z.literal("")),
});

module.exports = {
  createPostSchema,
};

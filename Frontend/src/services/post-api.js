import { apiClient } from "./api-client";

export const postApi = {
  getPosts() {
    return apiClient.get("/posts");
  },
  createPost(payload) {
    return apiClient.post("/posts", payload);
  },
};

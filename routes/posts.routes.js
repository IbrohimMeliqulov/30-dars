import { Router } from "express";
import { createpost, deletePost, getallPosts, getonePost, updatePost } from "../controllers/posts.controller.js";
const postRouter=Router()


postRouter.post("/",createpost)
postRouter.get("/",getallPosts)
postRouter.get("/:id",getonePost)
postRouter.delete("/:id",deletePost)
postRouter.put("/:id",updatePost)


export default postRouter
import { Router } from "express";
import { createcomments, deletecomment, getAllcomments, getOneComment, updateComment } from "../controllers/comments.controller.js";

const commentsRouter=Router()


commentsRouter.get("/",getAllcomments)
commentsRouter.get("/:id",getOneComment)
commentsRouter.post("/",createcomments)
commentsRouter.delete("/:id",deletecomment)
commentsRouter.put("/:id",updateComment)


export default commentsRouter
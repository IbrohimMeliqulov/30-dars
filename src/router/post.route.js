import {Router} from "express"
import { Createblog, Deletepost, getAllblogs, GetOneBlogPost, UpdateBlog } from "../controller/blog.controller.js"

const router=Router()



router.get("/", getAllblogs)
router.post("/",Createblog)
router.put("/:id",UpdateBlog)
router.delete("/:id",Deletepost)
router.get("/:id",GetOneBlogPost)

export default router
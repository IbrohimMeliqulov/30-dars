import { Router } from "express";
import { Usercontroller } from "../controllers/users.controller.js";

const usersRouter=Router()


usersRouter.get("/",Usercontroller.getAllusers)
usersRouter.get("/:id",Usercontroller.getOneUser)
usersRouter.post("/",Usercontroller.createUser)
usersRouter.put("/:id",Usercontroller.updateUser)
usersRouter.post("/:id",Usercontroller.deleteUser)


export default usersRouter
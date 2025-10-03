import express from "express"
import usersRouter from "./routes/user.routes.js"
import postRouter from "./routes/posts.routes.js"
import commentsRouter from "./routes/comments.routes.js"


const app=express()
app.use(express.json())
const PORT=process.env.PORT||3000

app.use("/users",usersRouter)
app.use("/posts",postRouter)
app.use("/comments",commentsRouter)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
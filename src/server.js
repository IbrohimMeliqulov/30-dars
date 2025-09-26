import express from "express"
import blogRouter from "./router/post.route.js"

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/posts",await blogRouter)


app.get("/",(req,res)=>{
    res.status(404).json({message:"not information found"})
})


const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
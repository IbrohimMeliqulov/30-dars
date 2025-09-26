import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



const blogfilepath = path.join(__dirname, "../../database/blogs.json")

export async function getAllblogs(req,res,next){
    try{
        const data=await fs.readFile(blogfilepath,"utf-8")
        const blogs=JSON.parse(data)
        res.status(200).json(blogs)
    }catch(err){
        next(err)
    }
}



export async function readfromBlogs(){
    const data=await fs.readFile(blogfilepath,"utf-8")
    const blogs=JSON.parse(data)
    return blogs
}


export async function Createblog(req,res,next){
    try{
        const data=req.body
        const blogs=await readfromBlogs()
        const date=new Date().toISOString()
        const newblog={id:blogs.length+1,...data,"createdAt":date}
        blogs.push(newblog)
        await fs.writeFile(blogfilepath,JSON.stringify(blogs,null,2))
        res.status(201).json({message:"Created"})
    }catch(err){
        res.status(400)
        next(err)
    }
}

export async function UpdateBlog(req,res,next){
    try{
        const id=req.params.id
        // console.log(id)
        const data=req.body
        const blogs=await readfromBlogs()
        const blogIndex=blogs.findIndex((b)=>b.id===+id)
        if(blogIndex===-1){
            res.status(404)
            res.send("Not found")
        }
        const updatedate=new Date().toISOString()
        const blog=blogs[blogIndex]
        // console.log(blog)
        // console.log(data)
        const updatedblog={...blog,...data,"updatedAt":updatedate}
        blogs[blogIndex]=updatedblog
        // console.log(blogIndex)
        await fs.writeFile(blogfilepath,JSON.stringify(blogs,null,2))
        res.status(200).json({message:`post updated`,updatedblog})
    }catch(err){
        res.status(400)
        next(err)
    }
}

export async function Deletepost(req,res,next){
    try{
        const id=req.params.id
        const blogs=await readfromBlogs()
        const blogIndex=blogs.findIndex((blog)=>blog.id===+id)
        if(blogIndex===-1){
            res.status(404).json({message:`${id} Not found`})
        }
        blogs.splice(blogIndex,1)
        await fs.writeFile(blogfilepath,JSON.stringify(blogs))
        res.status(204)
        res.send("No content")
    }catch(err){
        next(err)
    }
}

export async function GetOneBlogPost(req,res,next){
    try{
        const id=req.params.id
        const blogs=await readfromBlogs()
        const blogIndex=blogs.findIndex((blog)=>blog.id===+id)
        console.log(blogIndex)
        if(blogIndex===-1){
            res.status(404).json({message:`${id} Not found`})
        }
        const blog=blogs[blogIndex]
        res.status(201)
        res.send(blog)
    }catch(err){
        next(err)
    }
}

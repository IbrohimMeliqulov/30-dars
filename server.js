import http from "http"
import { json } from "stream/consumers"
import { getAllBooks,findbook,saveUser,UpdateUser,deletebook } from "./books.js"
import { error } from "console"




const server=http.createServer(async(req,res)=>{
    const method=req.method.toLowerCase()
    const url=req.url 
    if(method=="get" && url==="/books"){
        const books= await getAllBooks()
        res.writeHead(200,{"content-type":"application/json"})
        res.end(JSON.stringify(books))
    }else if(method==='get' && url.startsWith("/books/")){
        const id=parseInt(url.split("/")[2])
        if(id){
            const book= await findbook(id)
            res.writeHead(201,{"content-type":"application/json"})
            res.end(JSON.stringify(book))
        }
        res.writeHead(404,{"content-type":"application/json"})
        res.write({message:"Kitob topilmad"})
        res.end()
    }else if(method==="post" && url==="/books"){
        let body=""
        req.on("data",(chunk)=>{
            body+=chunk
        })
        req.on("end",async()=>{
            console.log("Received body:",body)
            try{
                const book=JSON.parse(body)
                const books=await saveUser(book)
                res.writeHead(201,{"content-type":"application/json"})
                res.end(JSON.stringify(books))
        }catch(err){
                console.log(err)
                res.writeHead(400,{"content-type":"application/json"})
                res.end(JSON.stringify({error:"Invalid JSON"}))
            }
        })
        return 
        }else if(method==="put" && url.startsWith("/books/")){
            const id=parseInt(url.split("/")[2])
            let body=""

            req.on("data",(chunk)=>{
                body+=chunk
            })
            req.on("end",async()=>{
                try{
                    if(!body){
                        throw new Error("empty body") 
                    }
                    const data=JSON.parse(body)
                    const books=await UpdateUser(id,data)
                    res.writeHead(200,{"content-type":"application/json"})
                    res.end(JSON.stringify(books))
                    console.log({books})
                }catch(err){
                    res.writeHead(400,{"content-type":"application/json"})
                    res.write(JSON.stringify({error:err.message}))
                    res.end()
                }
            })
        }else if(method==="delete" && url.startsWith("/books/")){
            const id=parseInt(url.split("/")[2])
            try{
                deletebook(id)
                res.writeHead(201,{"content-type":"application/json"})
                res.write(JSON.stringify({message:"Deleted succeffully"}))
                res.end()
                // return getAllBooks()
                console.log(getAllBooks())
            }catch(err){
                res.writeHead(404,{"content-type":"application/json"})
                res.write(JSON.stringify({error:err.message}))
                res.end()
            }
            
        }
        
        
        
        else{
            res.writeHead(404,{"content-type":"application/json"})
            res.write(JSON.stringify({message:"API not found"}))
            res.end()
        }
})


server.listen(3000,()=>{
    console.log("server port 3000 is listening")
})
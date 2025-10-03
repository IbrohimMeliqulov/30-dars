import { postfunction } from "../functions/function.js";


export async function createpost(req,res){
    try{
        const response=await postfunction.create(req.body)
        return res.json(response)
    }catch(err){
        console.log(err)
    }
}
export async function getallPosts(req,res){
    try{
        const response=await postfunction.getAllposts()
        return res.json(response)
    }catch(err){
        console.log(err)
    }

}

export async function getonePost(req,res){
    try{
        const {id}=req.params
        const response=await postfunction.getOnePost(id)
        return res.json(response)
    }catch(err){
        console.log(err)
    }
}

export async function deletePost(req,res){
    try{
        const {id}=req.params
        const response=await postfunction.delete(id)
        return res.json({message:`${id} post deleted ${response}`})
    }catch(err){
        console.log(err)
    }
}


export async function updatePost(req,res){
    try{
        const {id}=req.params
        const response=await postfunction.updatePost(id,req.body)
        return res.json(response)
    }catch(err){
        console.log(err)
    }
}
import pool from "../config/database.js"

export async function createcomments(req,res){
    try{
        const{id,content,post_id,user_id}=req.body
        const result=await pool.query(`INSERT INTO comments(id,content,post_id,user_id) VALUES($1,$2,$3,$4) RETURNING *`,[id,content,post_id,user_id])
        return res.json(result)
    }catch(err){
        console.log(err)
    }    
}


export async function getAllcomments(req,res){
    try{
        const result=await pool.query(`SELECT * FROM comments`)
        return res.json(result.rows)
    }catch(err){
        console.log(err)
    }
}

export async function getOneComment(req,res){
    try{
        const {rows}=await pool.query(`SELECT * FROM comments WHERE id=$1`,[req.params.id])
        return res.json(rows)
    }catch(err){
        console.log(err)
    }
}

export async function deletecomment(req,res){
    try{
        const {rows}= await pool.query('DELETE FROM comments WHERE id=$1',[req.params.id])
        return res.json({message:`${req.params.id} message deleted ${rows}`})
    }catch(err){
        console.log(err)
    }
}

export async function updateComment(req,res){
    try{
        const fields=[]
        const values=[]
        let idx=1
        for(const [key,value] of Object.entries(req.body)){
            fields.push(`${key}=$${idx}`)
            values.push(value)
            idx++
        }
        values.push(req.params.id)
        const {rows}=pool.query(`UPDATE comments SET ${fields.join(",")},updated_at=NOW() WHERE id=$${idx} RETURNING *`,values)
        return res.json({message:`${req.params.id} updated successfully ${rows}`})
    }catch(err){
        console.log(err)
    }
}
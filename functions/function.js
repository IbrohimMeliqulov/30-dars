import pool from "../config/database.js";
import { slugify } from "./slugify.js";

export const postfunction={
    create:async function(data){
        const {id,title,content,user_id}=data
        const slug=slugify(title)
        const text=`INSERT INTO posts(id,title,content,slug,user_id) VALUES($1,$2,$3,$4,$5) RETURNING *`;
        const values=[id,title,content,slug,user_id]
        console.log(values)
        const res=await pool.query(text,values)
        return res.rows[0]
    },
    getAllposts:async function(){
        const text=`SELECT * FROM posts`;
        const result=await pool.query(text)
        return result.rows
    },
    getOnePost:async function(id){
        const text=`SELECT * FROM posts WHERE id=$1 RETURNING *`
        // console.log(id)
        const result=await pool.query(text,[id])
        // console.log(result.rows[0])
        return result.rows
    },
    delete:async function(id){
        const text=`DELETE FROM posts WHERE id=$1 RETURNING *`;
        const result=await pool.query(text,[id])
        console.log(result.rows[0])
        return result.rows[0]
    },
    updatePost:async function(id,data){
        const fieilds=[]
        const values=[]
        let idx=1
        for(const [key,value] of Object.entries(data)){
            fieilds.push(`${key}=$${idx}`)
            values.push(value)
            idx++
        }
        values.push(Number(id))
        const result=await pool.query(`UPDATE posts SET ${fieilds.join(",")},updated_at=NOW() WHERE id=$${idx} RETURNING *`,values)
        return result
    }
}
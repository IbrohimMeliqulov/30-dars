import pool from "../config/database.js";


export const Usercontroller={
    getAllusers:async function(req,res){
        try{
            const {rows}=await pool.query(`SELECT * FROM users`)
            return res.json(rows)
        }catch(err){
            console.log(err)
        }
    },
    createUser:async function(req,res){
        try{
            const {id,first_name,email,last_name,password,phone_number,address}=req.body
            const result=await pool.query(
                `INSERT INTO users(id,first_name,email,last_name,password,phone_number,address) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,[id,first_name,email,last_name,password,phone_number,address]
            )
        return res.json(result.rows[0])
        }catch(err){
            console.log(err)
        }
    },
    updateUser:async function(req,res){
        try{
            const fields=[]
            const values=[]
            let idx=1
            for(const [key,value] of Object.entries(req.body)){
                fields.push(`${key}=$${idx}`)
                values.push(value)
                idx++
            }
            values.push(Number(req.params.id))

            const result=await pool.query(`UPDATE users SET ${fields.join(", ")},updated_at=NOW() WHERE id=$${idx} RETURNING *`,values)
            return res.json(result)
        }catch(err){
            console.log(err)
        }

    },
    getOneUser:async function(req,res){
        try{
            const result=await pool.query(`SELECT * FROM users WHERE id=$1`,[req.params.id])
            return res.json(result.rows[0])
        }catch(err){
            console.log(err)
        }
    },
    deleteUser:async function(req,res){
        try{
            const {rows}=await pool.query(`DELETE FROM users WHERE id=$1`,[req.params.id])
            return res.json({message:`${req.params.id} user deleted successfully ${rows}`})
        }catch(err){
            console.log(err)
        }
    }
}
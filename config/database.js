import pg from "pg"

const {Pool}=  pg

const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"odamlar",
    password:"1234",
    port:5432
})

export default pool
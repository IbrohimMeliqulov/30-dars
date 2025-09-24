import fs from "node:fs/promises"

const booksFilePath="./database/books.json"


export async function getAllBooks(){
    try{
        const data=await fs.readFile(booksFilePath,"utf-8")
        const books=await JSON.parse(data)
        // console.log(books)
        return books
    }catch(err){
        throw new Error(err)
    }
}
getAllBooks()




export async function findbook(id){
    try{
        const data=await fs.readFile(booksFilePath,"utf-8")
        const books=await JSON.parse(data)
        const book=books.find((book)=> book.id===id)
        return book
    }catch(err){
        throw new Error(err)
    }
}
findbook()


export async function saveUser(book){
    try{
        const books=await getAllBooks()
        const newbook={id:books.length+1,...book}
        books.push(newbook)

        await fs.writeFile(booksFilePath,JSON.stringify(books))
        return books
    }catch(err){
        throw new Error(err)
    }
}



export async function UpdateUser(id,data){
    try{
        const books=await getAllBooks()
        const bookIndex=books.findIndex((book)=>book.id===id)
        if(bookIndex===-1){
            return{
                message: "User not found"
            }
        }
        const book=books[bookIndex]
        const updatebook={...book,...data,id}
        books[bookIndex]=updatebook
        await fs.writeFile(booksFilePath,JSON.stringify(books,null,2))
        return updatebook
    }catch(err){
        throw new Error(err)
    }
}


export async function deletebook(id){
    try{
        const books=await getAllBooks()
        const bookIndex=books.findIndex((book)=>book.id===id)
        if(bookIndex===-1){
            return {
                message:`${id} Book not found`
            }
        }
        const book=books[bookIndex]
        books.splice(bookIndex,1)

        await  fs.writeFile(booksFilePath,JSON.stringify(books,null,2))
        return {message:"book deleted succefully",book} 
    }catch(err){
        throw new Error(err)
    }
}
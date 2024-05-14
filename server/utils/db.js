require ("dotenv").config()

const mongoose =require ("mongoose")

const URI=process.env.MONGODB_URI
// mongoose.connect

const connectDB=async ()=>{
    try{
        await mongoose.connect(URI)
        console.log("Server Conneting to DB")
    }
    catch(error){

        console.error("database connection Failed ")
        process.exit(0)
    }
}

module.exports=connectDB
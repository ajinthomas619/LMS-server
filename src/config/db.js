import mongoose from "mongoose";


const connectDB = async() => {
    try{
    console.log("Entering db");
    await mongoose.connect(process.env.DATABASE_URL )
      console.log("Connected to the mongodb database")
    
}
catch(error){
    console.error("Error connecting to the MongoDB Database:",error)
    process.exit(1)
}
};

export default connectDB;
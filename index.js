import  app  from "../server/app.js";
import connectDB from "../server/src/config/db.js";


const PORT = process.env.PORT || 3000
const start = async() => {
    try{
        await connectDB()
        console.log('connected to database')

        await new Promise((resolve, reject) => {
            app.listen(PORT, () => {
                console.log(`Server started @ port ${PORT}`);
                resolve();
            }).on('error', (err) => {
                console.error(err);
                reject(err);
            });
        })
    }
        catch(error){
    console.log(error)
        }
    }
start()
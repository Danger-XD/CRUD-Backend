import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import router from "./routes/api.js";

const app = express();
const port = 1212;

const dbUrl = "YOUR DB CONNECTION STRING";
const dbName = "studentDB";

let db = null;

// connect with mongoDB
const connectToDB = async() =>{
    const client = new MongoClient(dbUrl);
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
    return db;
}

app.use(bodyParser.json());

connectToDB().then((database)=>{
    console.log(database);
    // middleware for db
    app.use((req,res,next)=>{
        req.db = database;
        //console.log(database);//check
        //console.log(req.db);//check
        next();
    })
    // base route
    app.use("/api",router)

}).catch((err)=>{
    console.log("failed to connect with mongoDB",err);
})

app.listen(port,()=>{
    console.log(`Server is running on ${port} successfully`);
})
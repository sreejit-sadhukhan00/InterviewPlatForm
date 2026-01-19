import express from "express";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";
import path from "path";
import { connect } from "http2";
import { connectDB } from "./lib/db.js";
dotenv.config();


const app = express();

const __dirname=path.resolve();
app.use(express.json());

app.get("/health",(req,res)=>{
     res.status(200).send("Server is healthy");
})
 
// make our app development ready 
 if(ENV.NODE_ENV==="production"){
     app.use(express.static(path.join(__dirname,"../Frontend/dist")));
     app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
     })
 }

const startServer=async()=>{
     try{
        await connectDB();
        app.listen(ENV.PORT,()=>{
    console.log("Server is running on port:",ENV.PORT);
});

     }
     catch(error){
        console.error("Error starting the server:",error);
     }
}

startServer();
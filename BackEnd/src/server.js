import express from "express";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";

dotenv.config();


const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
     res.status(200).send("Server is healthy");
})
 
app.listen(ENV.PORT,()=>{
    console.log("Server is running on port:",ENV.PORT);
});
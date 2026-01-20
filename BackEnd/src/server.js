import express from "express";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from "inngest/express"
import { clerkMiddleware } from '@clerk/express'
import { inngest,functions  } from "./lib/inngest.js";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
dotenv.config();


const app = express();

const __dirname=path.resolve();
// middleware 
app.use(express.json());
app.use(cors(
    {
       origin:ENV.CLIENT_URL  ,
       credenetials:true
    }
));
app.use(clerkMiddleware()); // this will add auth field to request obj:req.auth()


app.use("/api/inngest",serve({
    client:inngest,functions
}));
app.get("/health",(req,res)=>{
     res.status(200).send("Server is healthy");
})

// routes 
 app.use("/api/chat",chatRoutes)


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

import {  requireAuth } from '@clerk/express'
import User from '../models/User.js'

export const protectRoute=[
     requireAuth()// this will ensure the request is authenticated with clerk
     ,
     async(req,res,next)=>{
         try {
            const clerkUserId=req.auth().userId;
            if(!clerkUserId){
                 return res.status(401).json({message:"Unauthorized"});
            }
            //find user in db by clerk iid
             const user=await User.findOne({
                clerkId:clerkUserId
             })
             if(!user){
                return res.status(401).json({message:"user not found"});
             }
             //attach user to request object
             req.user=user;
                next();
         } catch (error) {
             console.error("Error in protectRoute middleware:",error);
             res.status(500).json({message:"Internal server error"});
         }
     }
]
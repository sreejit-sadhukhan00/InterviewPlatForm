import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
      try { 
        //use the clerkId stored in req.user to create a token not mongo id bcz it should have the same id as stream user
        const token=chatClient.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId:req.user.clerkId,
            name:req.user.name,
            profileImage:req.user.profileImage,
        });
      } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.log("Error generating stream token:",error);
      }
}
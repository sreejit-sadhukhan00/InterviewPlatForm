import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export async function createSession(req,res){
   try {
    //  extract data from request body
      const {problem,difficulty}=req.body;
      const userId=req.user._id;
      const clerkId=req.user.clerkId;
    //   check required fields
        if(!problem || !difficulty){
              return res.status(400).json({message:"problem and difficulty are required"});
        }

        // generate a unique stream video call key id 
        const callId=`session_${Date.now()}_${Math.random().toString(36).substring(7)}`
         
        

        // create a stream video call channel for this session and with same callId
       const call=  await streamClient.video.call("default",callId).getOrCreate({
            data:{
                created_by:clerkId,
                custom:{
                    problem,
                    difficulty,
                    sessionId:session._id.toString()
                }
            },
         });

        // create a stream chat channel for this session with same callId
        try {
            const channel = chatClient.channel("messaging",callId,{
             name:`${problem} Session`,
             created_by:clerkId,
             members:[clerkId]
        }); 
        // DEBUGGING TO BE DELETED LATER
      console.log("Creating chat channel for session:", channel);
        
        await channel.create();

      //   only create db session if chat channel is created successfully
          // create session in db
        const session=await Session.create({
             problem,
             difficulty,
             host:userId,
             callId
        });
         // todo FOR NOTIFICATION PURPOSES LATER
        } catch (channelError) {
         //  rollback stream video call creation if chat channel creation fails
         await call.delete({hard:true});
         console.error("Error creating chat channel:", channelError);
         return res.status(500).json({message:"Failed to create session chat channel"});
        };
        // SEND RESPONSE TO CLIENT IF ALL OPERATIONS ARE SUCCESSFUL
        res.status(201).send({
            message:"Session created successfully",
            Session:session,
        });
   } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({message:"Internal server error"});
   }
};

export async function getActiveSessions(_,res){
 try {
   const sessions= (await Session.find({status:'active'}).populate('host',"name email profileImage clerkId"))
   .toSorted({createdAt:-1})
   .limit(20);
    res.status(200).json({sessions
    })
 } catch (error) {
    console.error("Error fetching active sessions:", error.message);
    res.status(500).json({message:"Internal server error"});
 }

};

export async function getMyRecentSessions(req,res){
   try {
       const userId=req.user._id;
    //  get sessions where user is host or participant
      const sessions=  await Session.find({
            status:'completed',
            $or:[{host:userId},{participants:userId}]
            
        }).sort({createdAt:-1}).limit(20);

       res.status(200).send({
        message:"Recent sessions fetched successfully",
        sessions
       })
   } catch (error) {
      console.error("Error fetching recent sessions:", error.message);
        res.status(500).json({message:"Internal server error"});
   }

};

export async function getSessionById(req,res){
      try {
         const {id}=req.params;
         const session=await Session.findById(id).populate('host',"name email profileImage clerkId")
         .populate('participants',"name email profileImage clerkId");

         if(!session){
            return res.status(404).send({message:"Session not found"});
         }

          res.status(200).send({
            message:"Session fetched successfully",
            session
          })
      } catch (error) {
            console.error("Error fetching session by ID:", error.message);
            res.status(500).json({message:"Internal server error"});
      }
};

export async function joinSession(req,res){
  try {
     const {id}=req.params;
      const userId=req.user._id;
        const clerkId=req.user.clerkId;

        const session=await Session.findById(id);
         if(!session){
            return res.status(404).send({message:"Session not found"});
         } 
         //   if session is not active
           if(session.status !=='active'){
            return res.status(400).send({message:"Cannot join a completed session"});
           }

           if(session.host.toString()=== userId.toString()){
            return res.status(400).send({message:"Host cannot join their own session as participant"});
           }
        //  check if session is  already have two participants including the one who created it
          if(session.participants){
             return res.status(409).send({message:"Session is full"});
          }

        //   add user to the participants field 
         session.participants=userId;
            await session.save();
        // add user to the stream chat channel for this session
         const channel =chatClient.channel("messaging",session.callId);
            await channel.addMembers([clerkId]);
            res.status(200).send({ 
                message:"Joined session successfully",
                session
            })

  } catch (error) {
    console.error("Error joining session:", error.message);
    res.status(500).json({message:"Internal server error"});
  }

};

export async function EndSession(req,res){
    try {
         const {id}=req.params;
         const userId=req.user._id;

         const session=await Session.findById(id);
          if(!session){
            return res.status(404).send({message:"Session not found"});
          }
        //   check if the user is the host of the session
        if(session.host.toString()!== userId.toString()){
            return res.status(403).send({message:"Only the host can end the session"});
        }
        // check if session is already completed
         if(session.status==='completed'){
            return res.status(400).send({message:"Session is already completed"});
         }
         
        // delete the stream video call channel for this session
        const call=streamClient.video.call("default",session.callId);
        await call.delete({hard:true});
        // delete the stream chat channel for this session
        const channel=chatClient.channel("messaging",session.callId);
        await channel.delete();
        
         // update session status to completed
         session.status='completd';
         await session.save();


         res.status(200).send({
            message:"Session ended successfully",
         })
    } catch (error) {
        console.error("Error ending session:", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}; 


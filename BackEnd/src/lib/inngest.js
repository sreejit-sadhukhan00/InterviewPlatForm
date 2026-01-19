import {Inngest} from "inngest"
import { connectDB } from "./db.js"
import User from "../models/User.js"
import { deleteStreamUser, upsertStreamUser } from "./stream.js";


export const inngest=new Inngest({
    id:"interview-platform-1",
});

const syncUser=inngest.createFunction(
    {
         id:"sync-user"
    },
    {
         event:"clerk/user.created"
    },
    async({event})=>{
         await connectDB();
      const {id,email_addresses,first_name,last_name,image_url}=   event.data;
      const newUSer={
        clerkId:id,
        email:email_addresses[0].email_address,
        name:`${first_name} ${last_name}`,
        profileImage:image_url,
      }
      await User.create(newUSer)
    //   todo:save it to stream 
       await upsertStreamUser({
          id:newUSer.clerkId,
          name:newUSer.name,
          image:newUSer.profileImage,
       });
    }
)


const DeleteUserFromDb=inngest.createFunction(
    {
         id:"delete-user-from-db"
    },
    {
         event:"clerk/user.deleted"
    },
    async({event})=>{
         await connectDB();
      const {id}=   event.data;
      await User.deleteOne({
        clerkId:id
      });
    //   todo :delete user from stream 
       await deleteStreamUser(id.toString()); 
    }
)

export const functions=[syncUser,DeleteUserFromDb];
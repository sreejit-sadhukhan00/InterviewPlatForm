import {StreamChat} from 'stream-chat';
import {StreamClient} from '@stream-io/node-sdk';
import { ENV } from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apisecret = ENV.STRAM_API_SECRET;

if(!apiKey || !apisecret) {
    console.error("Stream API key or secret is missing");
}

export const chatClient=StreamChat.getInstance(apiKey,apisecret); //this is for chat features 

export const streamClient=new StreamClient(apiKey,apisecret)  // this will be used for video calling features
export const upsertStreamUser=async(user)=>{
     try {
        await chatClient.upsertUser(user);
        console.log("Upserted Stream user:", user.id);
     } catch (error) {
        console.error("Error upserting Stream user:", error);
     }
}
export const deleteStreamUser=async(userId)=>{
     try {
        await chatClient.deleteUser(userId);
       console.log("Deleted Stream user:", userId); 
     } catch (error) {
        console.error("Error deleting Stream user:", error);
     }
}



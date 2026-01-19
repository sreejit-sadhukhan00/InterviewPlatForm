import {StreamChat} from 'stream-chat';
import { ENV } from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apisecret = ENV.STRAM_API_SECRET;

if(!apiKey || !apisecret) {
    console.error("Stream API key or secret is missing");
}

export const chatClient=StreamChat.getInstance(apiKey,apisecret);

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

// add anothermethod to generate token 
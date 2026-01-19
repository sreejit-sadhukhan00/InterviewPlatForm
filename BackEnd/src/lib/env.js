import dotenv from "dotenv";
dotenv.config({quiet: true});

export const ENV={
    PORT:process.env.PORT,
    DATABASE_URL:process.env.DATABASE_URL,
    NODE_ENV:process.env.NODE_ENV,
    CLIENT_URL:process.env.CLIENT_URL,
    INNGEST_EVENT_KEY:process.env.INNGEST_EVENT_KEY,
    INGEST_SIGNING_KEY:process.env.INGEST_SIGNING_KEY,
    STREAM_API_KEY:process.env.STREAM_API_KEY,
    STRAM_API_SECRET:process.env.STRAM_API_SECRET,
    
CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
}
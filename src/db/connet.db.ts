import { MongoClient } from "mongodb";

const mongoURL: string  = process.env.DB_URL ? process.env.DB_URL : ""
let db = null;

async function connectToMongoDB() {
    try {
        const mongoClient = new MongoClient(mongoURL);
        db = await mongoClient.connect();
        console.log("Database connected...");
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
    
}

export { connectToMongoDB, db };
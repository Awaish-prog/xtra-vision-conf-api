import { MongoClient, Db } from "mongodb";

const mongoURL: string  = process.env.DB_URL ? process.env.DB_URL : ""
let db: Db | null = null;

async function connectToMongoDB() {
    try {
        const mongoClient = new MongoClient(mongoURL);
        await mongoClient.connect();
        db = mongoClient.db("Xtra-vision-conf");
        console.log("Database connected...");
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
    
}

export { connectToMongoDB, db };
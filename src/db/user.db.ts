import { InsertOneResult } from "mongodb";
import { User } from "../types/user.type";
import { db } from "./connet.db";

export async function createNewUserDb({ name, email, encryptedPassword, id }: User){
    try{
        const userCollection = db?.collection('users');
        const user: InsertOneResult<Document> | undefined = await userCollection?.insertOne({
            id,
            name,
            email,
            encryptedPassword
        })
        return user;
    }
    catch(e){
        console.log(e);
        return null;
    }
}

export async function findUserByEmail(email: string){
    try{
        const userCollection = db?.collection('users');
        return await userCollection?.findOne({ email });
    }
    catch(e){
        console.log(e);
        return null;
    }
}
import { InsertOneResult } from "mongodb";
import { db } from "./connet.db";
import { Meeting } from "../types/meeting.type";

export async function findMeetingByDateAndId(dateTime: string, hostId: string){
    try{
        const meetingCollection = db?.collection('meetings');
        return await meetingCollection?.findOne({ dateTime, hostId });
    }
    catch(e){
        console.log(e);
        return null;
    }
}

export async function createNewMeetingDb({ id, title, dateTime, hostId }: Meeting){
    try{
        const meetingCollection = db?.collection('meetings');
        const meeting: InsertOneResult<Document> | undefined = await meetingCollection?.insertOne({
            id,
            title,
            dateTime,
            hostId
        })
        return meeting;
    }
    catch(e){
        console.log(e);
        return null;
    }
}

export async function getMeetingsByHostId(hostId: string){
    try{
        const meetingCollection = db?.collection('meetings');
        return await meetingCollection?.find({ hostId }).toArray();
    }
    catch(e){

    }
}
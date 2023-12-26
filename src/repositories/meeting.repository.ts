import { createNewMeetingDb, findMeetingByDateAndId } from "../db/meeting.db";
import { Meeting } from "../types/meeting.type";
import { v4 as uuidv4 } from 'uuid';

export async function createMeetingRepo({ title, hostId, dateTime }: Meeting){
    try{
        const meeting = await findMeetingByDateAndId(dateTime, hostId);
        if(meeting){
            return { status: 500, data: { message: "A meeting is already present at the same time." }};
        }
        const id: string = uuidv4();
        
        if(await createNewMeetingDb({id, title, dateTime, hostId})){
            return { status: 200, data: { id, title, dateTime, hostId }};
        }
        return { status: 500, data: { message: "Meeting creation failed..." }};
    }
    catch(e){
        console.log(e);
        return { status: 500, data: { message: "Meeting creation failed..." }};
    }
}
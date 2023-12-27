import { createNewMeetingDb, findMeetingByDateAndId, getMeetingsByHostId, getMeetingsById } from "../db/meeting.db";
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

export async function getMeetingsRepo(hostId: string){
    try{
        const meetings = await getMeetingsByHostId(hostId);
        const currentDate = new Date();
        const previousMeetings: any[] = [];
        const upcomingMeetings: any[] = [];
        if(meetings && meetings.length){
            meetings.forEach((meeting) => {
                const date = new Date(meeting.dateTime);
              
                if (date < currentDate) {
                    previousMeetings.push(meeting);
                } else {
                    upcomingMeetings.push(meeting);
                }
            });
        }
        
        return { status: 200, data: { previousMeetings, upcomingMeetings } }
    }
    catch(e){
        console.log(e);
        return { status: 404, data: { message: "Failed to get meetings" }};
    }
}

export async function getHostIdRepo(roomId: string){
    try{
        const meeting = await getMeetingsById(roomId);
        if(meeting){
            return { status: 200, hostId: meeting.hostId };
        }
        return { status: 404, data: { message: "Meeting was not found" }};
    }
    catch(e){
        console.log(e);
        return { status: 404, data: { message: "Meeting was not found" }};
    }
}
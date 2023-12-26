import { createMeetingRepo } from "../repositories/meeting.repository";
import { ApiResponse } from "../types/api.response";
import { Meeting } from "../types/meeting.type";
import { Request, Response } from "express";

async function createMeeting(req: Request, res: Response){
    try{
        res.json(await createMeetingRepo(req.body));
    }
    catch(e){
        console.log(e);
        res.json({ status: 500, data: { message: "Meeting creation failed..." }});
    }
}


export { createMeeting };
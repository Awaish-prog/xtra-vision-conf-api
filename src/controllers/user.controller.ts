import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../types/user.type";
import { generateJwtToken } from "../utils/jwt";
import { ApiResponse } from "../types/api.response";
import { loginUserRepo, signUpUserRepo } from "../repositories/user.repository";

export async function signUpUser(req: Request, res: Response){
    try{
        res.json(await signUpUserRepo(req.body));
    }
    catch(e){
        console.log(e);
        res.json({ status: 500, data: { message: "sign up failed..." }});
    }
}

export async function loginUser(req: Request, res: Response){
    try{
        res.json(await loginUserRepo(req.body));
    }
    catch(e){
        console.log(e);
        res.json({ status: 404, data: { message: "Login failed..." }});
    }
}
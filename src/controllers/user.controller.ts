import { Request, Response } from "express";
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
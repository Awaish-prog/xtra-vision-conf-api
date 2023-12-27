import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

export default function authenticate(req: Request, res: Response, next: NextFunction){
    const token = req.header('Authentication');
    const email = req.header('email');
    
    if (!token){
        return res.json({ status: 401, data: { message: "Auth token is not provided" }});
    }
    const key: string = process.env.JWT_KEY ? process.env.JWT_KEY : ''; 
    const decoded = jwt.verify(token, key);
    if(decoded === email){
        return next();
    }
    return res.json({ status: 403, data: { message: "Auth token wrong" }});
}
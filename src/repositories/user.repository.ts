import { v4 as uuidv4 } from 'uuid';
import { generateJwtToken } from '../utils/jwt';
import { createNewUserDb, findUserByEmail } from '../db/user.db';
import { User } from '../types/user.type';
import bcrypt from 'bcrypt';

export async function signUpUserRepo({ email, name, password }: User){
    try{
        const user = await findUserByEmail(email);
        if(user){
            return { status: 500, data: { message: "User with this email is already present" }};
        }
        const id: string = uuidv4();
        const token: string | null = generateJwtToken(email);
        let encryptedPassword: string = "";
        if(password){
            const salt = bcrypt.genSaltSync(3);
            encryptedPassword = bcrypt.hashSync(password, salt);
        }
        if(!encryptedPassword){
            return { status: 500, data: { message: "sign up failed..." }};
        }
        if(await createNewUserDb({name, email, encryptedPassword, id})){
            return { status: 200, data: { token, id, email, name }};
        }
        return { status: 500, data: { message: "sign up failed..." }};
    }
    catch(e){
        console.log(e);
        return { status: 500, data: { message: "sign up failed..." }};
    }
}

export async function loginUserRepo({ email, password }: User){
    try{
        const user = await findUserByEmail(email);
        if(!user){
            return { status: 404, data: { message: "User with this email is not present" }};
        }
        if(password && bcrypt.compareSync(password, user.encryptedPassword)){
            const { email, id, name } = user;
            const token: string | null = generateJwtToken(email);
            return { status: 200, data: { token, id, email, name }};
        }
        return { status: 404, data: { message: "Wrong Password" }};
    }
    catch(e){
        console.log(e);
        return { status: 404, data: { message: "Login failed" }};
    }
}
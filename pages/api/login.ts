import dbConnect from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export async function compareHashPasswordWith(email: string, password: string) {
    const user = await User.findOne({email: email});
    if (!user || !user.password ) return false;
    return await bcrypt.compare(password, user.password!);
}


// dbConnect()
export default async function login(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const {email, password} = req.body;

    try {
        const isMatch = await compareHashPasswordWith(email,password);
        if(!isMatch) {
            return res.status(401).json({error: 'Invalid credentials'});
        }


        //not sure if i should have _id, and userName 
        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in .env.local");
        }

        const token = jwt.sign(
        { email: email },
        JWT_SECRET, 
        { expiresIn: '1h' }
        );


        return res.status(200).json({message: 'Logged in successfully', token});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'server error'});
        
    }

}


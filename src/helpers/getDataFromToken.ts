import jwt from 'jsonwebtoken';
import { NextRequest } from "next/server";
type TokenType = {
    id: string;
    email: string;
    username: string;
}
export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenType;
        console.log("decodedToken ID:", decodedToken.id);
        console.log("token:", token);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
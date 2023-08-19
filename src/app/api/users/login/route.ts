import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest, res: NextResponse) {

    try {
        const reqBody = await request.json();
        //e.log("reqBody:", reqBody)
        const { email, password } = reqBody;

        // if user already exists
        if (Array.from(reqBody).every((val) => val ? true : false)) {
            const user = await User.findOne({ email });
            //e.log("user:", user)
            if (!user) {
                return NextResponse.json({ error: "User Doesn't exists" }, { status: 500 });
            }

            // check if password is correct
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                // throw new Error("Invalid password")
                return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
            }
            // create token data
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }

            // create token
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
            const response = NextResponse.json({
                message: "Login successfully",
                success: true,
                user
            }, { status: 200 });

            response.cookies.set("token", token, {
                httpOnly: true
            })

            return response;
        } else {
            return NextResponse.json({ error: "Please provide user information" }, { status: 400 });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Internal server Error" }, { status: error.status || 500 });
    }

}
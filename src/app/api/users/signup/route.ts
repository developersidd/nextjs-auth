import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


connect();


export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        // if user already exists
        if (Array.from(reqBody).every((val) => val ? true : false)) {
            const user = await User.findOne({ email });
            if (user) {
                return NextResponse.json({ error: "User already exists" }, { status: 500 });
            }
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            // save user to DB
            const newUser = new User({ username, email, password: hashedPassword });
            const savedUser = await newUser.save();

            // Send verification email
            const res = await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

            return NextResponse.json({
                message: "User saved successfully",
                success: true,
                savedUser,
                ...res
            }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Please provide user information" }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
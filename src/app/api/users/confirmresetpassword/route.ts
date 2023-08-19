import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    const { token, password } = reqBody;
    const hashedPass = await bcrypt.hash(password, 10);

    try {
        const user = await User.findOne({ forgorPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })
        console.log("user:", user)
        if (!user) {
            return NextResponse.json({ error: "There was an Error while Reseting email" }, { status: 500 });
        }
        console.log("user:", user);

        // if all validation is done then update user verification in DB
        user.password = hashedPass;
        user.forgorPasswordToken = "";
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: "Password has been Reset successfully", success: "ok" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

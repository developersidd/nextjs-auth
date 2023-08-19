import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    const { email } = reqBody;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "There is an Error while Reseting Password" }, {status: 400});
        }
        console.log("user:", user);
        await sendEmail({ email, emailType: "RESET", userId: user?._id });
        return NextResponse.json({ message: "User found", success: "ok" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
